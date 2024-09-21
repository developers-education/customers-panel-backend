FROM node:20.1

WORKDIR app/

RUN npm install -g npm

ADD package.json .
ADD package-lock.json .

RUN npm i

ADD . .

EXPOSE 4000
EXPOSE 4001

CMD npm run start
