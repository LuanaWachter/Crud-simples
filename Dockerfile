#----- NODE CONFIGS -----
FROM node:16.13.1-alpine AS base

WORKDIR /app

COPY . /app

# ----- BUILD -----
FROM base as build

RUN yarn install --silent

RUN yarn run prebuild
RUN yarn run build

# ----- RELEASE -----
FROM base as release
WORKDIR /build

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json .
COPY --from=build /app/tsconfig.build.json .

RUN chown -R node:node /build

USER node

EXPOSE 3333

CMD ["npm", "run", "start"]
