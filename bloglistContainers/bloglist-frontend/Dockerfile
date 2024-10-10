# Use Node as a build stage
FROM node:20 AS build_stage

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Use Nginx to serve the application
FROM nginx:1.20.1 AS deploy_stage

COPY --from=build_stage /usr/src/app/dist /usr/share/nginx/html

# # Expose port 80 for Nginx
# EXPOSE 80

# # Start Nginx when the container starts
# CMD ["nginx", "-g", "daemon off;"]
