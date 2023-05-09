FROM golang:1.20.4-alpine3.17 as builder
WORKDIR /backend
COPY . .
RUN apk add -u -t build-tools curl git && \
    CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o api . && \
    apk del build-tools && \
    rm -rf /var/cache/apk/*

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /app
COPY --from=builder /backend/api .
ENV DOCKER_ENV="true"
ENTRYPOINT ["./api"]