# --- base
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# --- dev (hot reload)
FROM base AS dev
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm","run","dev"]

FROM base AS build
RUN npm ci
COPY . .
RUN npm run build
FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node","dist/server.js"]
