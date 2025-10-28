
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build


FROM nginx:stable-alpine

# Copy build output from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a default nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the container
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
