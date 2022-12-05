FROM node:16

WORKDIR /server

COPY package.json yarn.lock ./

RUN yarn

COPY . .

ENV PORT=8888

VOLUME [ "/public" ]

EXPOSE ${PORT}

CMD ["yarn", "dev"]

