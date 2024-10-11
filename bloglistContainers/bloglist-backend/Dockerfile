FROM node:20

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including devDependencies for build purposes)
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port the app runs on
EXPOSE 3003

# Start the application
CMD ["npm", "run", "start"]
