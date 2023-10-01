FROM node:18 as build

WORKDIR /usr/app

COPY package.json .
RUN npm i

COPY index.html ./
COPY src src
COPY public public

RUN npm run build

FROM nginx:1.25-alpine3.18

COPY --from=build /usr/app/dist /usr/share/nginx/html
