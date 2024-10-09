FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Install nodemon globally to watch for file changes
# RUN npm install -g nodemon

COPY . .

EXPOSE 3003

CMD ["npm", "run", "dev"]
