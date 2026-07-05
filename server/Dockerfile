# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# Install all deps (including dev) to build/compile
COPY package*.json ./
RUN npm ci

# Copy source and build (e.g. TypeScript -> dist, or any build step)
COPY . .
RUN npm run build

# ---- Production stage ----
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Only install production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy only the built output from the build stage
COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/server.js"]
