FROM node:18.20.2 as react-build

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn

COPY . ./
RUN yarn build


FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=0 /app/build /usr/share/nginx/html 

COPY ./env.sh .
COPY .env.example .

RUN apk add --no-cache bash
RUN chmod +x env.sh

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]