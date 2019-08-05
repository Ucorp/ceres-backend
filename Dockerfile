FROM node:lts-alpine

WORKDIR /home/node/app

COPY --chown=node . .

RUN npm set unsafe-perm true

RUN npm i --production

CMD ["npm", "start"]

USER node
