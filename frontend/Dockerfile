FROM node:latest as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:latest as production
WORKDIR /app
COPY --from=builder /app .
COPY . .
CMD ["yarn", "start"]