FROM mhart/alpine-node:latest
ENV NODE_ENV production

RUN mkdir -p /var/taxi-app
WORKDIR /var/taxi-app
COPY package.json /var/taxi-app
COPY . /var/taxi-app
RUN npm install

EXPOSE 8080

CMD npm run start