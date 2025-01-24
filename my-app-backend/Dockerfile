# Step 1: Use the official Node.js image from Docker Hub
FROM node:20-slim

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json first (for caching purposes)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your backend app files
COPY . .

# Step 6: Expose the backend port
EXPOSE 5000

# Step 7: Run the server
CMD ["node", "index.js"]
