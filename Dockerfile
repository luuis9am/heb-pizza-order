# Specify the base image
FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm ci --only=production

# Bundle app source
COPY . .

# If your app has a 'build' step, you can run it here
# RUN npm run build

# Expose a port
EXPOSE 4200

# Start the app
CMD [ "npm", "start" ]
