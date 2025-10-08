# Step 1: Build the Vite/React app
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm install

# Copy the full project (after installing deps)
COPY . .

# ✅ Fix permission after copying everything
RUN chmod +x node_modules/.bin/vite

# Run the build
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
