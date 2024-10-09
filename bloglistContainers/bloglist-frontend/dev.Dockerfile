FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Vite will be served on
EXPOSE 5173

# Start the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]
