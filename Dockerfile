FROM node:latest as build-front-end
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM golang:latest as build-back-end
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

FROM alpine:latest as certs
RUN apk --update add ca-certificates

FROM golang:latest as api
WORKDIR /app
COPY --from=build-back-end /app .
COPY /backend .
RUN CGO_ENABLED=0 GOOS=linux go run main.go

FROM node:latest as web
WORKDIR /app
COPY --from=build-front-end /app .
COPY . . --exclude backend
RUN npm run build

FROM alpine:latest
WORKDIR /app
COPY --from=api /app .
COPY --from=web /app/build ./build
COPY --from=certs /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
EXPOSE 8080
CMD ["./main"]