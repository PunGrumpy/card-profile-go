FROM golang:latest as builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

FROM golang:latest as production
WORKDIR /app
COPY --from=builder /app .
COPY . .
RUN go build -o main .