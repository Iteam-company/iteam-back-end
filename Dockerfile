FROM node:16

WORKDIR /server

COPY package.json /server

RUN yarn

COPY . .

ENV PORT=8888

VOLUME [ "/public" ]

EXPOSE ${PORT}

CMD ["yarn", "dev"]

