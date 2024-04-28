###### RUN IT WITH:
###### docker build -t jest-tests .
###### docker run --rm --env-file .env jest-tests

# Noda base image
FROM node:22

WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Run Jest tests
CMD ["npm", "test"]
