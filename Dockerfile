FROM node:lts-alpine

WORKDIR /home/node/app

COPY --chown=node . .

RUN npm i --production

RUN mkdir logs

RUN mv .env.example .env

CMD ["npm", "start"]

USER node
