FROM node:12.16.1

WORKDIR /usr/src/app

COPY build/covid-19-api-*.zip ./covid-19-api.zip
RUN unzip covid-19-api.zip

RUN npm set registry http://localhost:30000/

RUN yarn

CMD ["yarn", "start:prod"]
