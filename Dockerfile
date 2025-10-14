# Build stage
FROM node:22-alpine AS build
WORKDIR /app

# Copy package files
COPY package*.json ./
# Install deps (includes devDeps for build)
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build   # Vite outputs to /app/dist

# Production stage
FROM nginx:alpine

# Copy built app to nginx (use dist, not build)
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: custom nginx config (SPA fallback, caching, etc.)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
