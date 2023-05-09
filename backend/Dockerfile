FROM golang:1.20.4-alpine3.17 as builder
WORKDIR /backend
COPY . .
RUN apk add --no-cache --virtual build-tools curl git openssl && \
    CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o api . && \
    openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 \
    -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=www.card-profile-go.vercel.app/" \
    -keyout /backend/certificate.key  -out /backend/certificate.crt && \
    apk del build-tools && \
    rm -rf /var/cache/apk/*

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /app
COPY --from=builder /backend/api .
COPY --from=builder /backend/certificate.crt /certs/
COPY --from=builder /backend/certificate.key /certs/
ENV DOCKER_ENV="true"
ENTRYPOINT ["./api"]