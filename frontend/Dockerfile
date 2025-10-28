# ---- Build stage ----
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Run Vite build (creates /app/dist)
RUN npm run build

# ---- Serve stage ----
FROM nginx:alpine

# Copy built Vite files to Nginx web root
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
