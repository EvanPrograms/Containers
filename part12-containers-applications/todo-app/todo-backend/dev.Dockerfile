# Use a base Node.js image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally to watch for file changes
RUN npm install -g nodemon

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 3003

# Use Nodemon to start the application in development mode
CMD npm run dev