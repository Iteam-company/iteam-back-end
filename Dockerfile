FROM node:19-alpine3.16 as common-build-stage

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

# Development build stage
# FROM common-build-stage as development-build-stage

ENV NODE_ENV development
ENV PORT=5001
EXPOSE ${PORT}

CMD ["npm", "run", "start:dev-docker"]

# Production build stage
# FROM common-build-stage as production-build-stage

# ENV NODE_ENV production
# # ENV PORT=1337
# # EXPOSE ${PORT}

# CMD ["npm", "run", "start"]