# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend directory to the container
COPY . .

# Expose the port on which the server will run
EXPOSE 1337

# Command to run the server
CMD ["node", "index.js"]
