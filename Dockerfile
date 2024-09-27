# Base stage
FROM node:18-alpine AS base

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies, including Prisma CLI
RUN npm install

# Install Prisma CLI globally
RUN npm install -g prisma

# Copy the application files
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the TypeScript code
RUN npm install -g typescript
RUN npm run build

# Production stage
FROM node:18-alpine AS final

# Set the working directory
WORKDIR /app

# Copy built files and dependencies from base stage
COPY --from=base /app ./

# Expose the port that the application will run on
EXPOSE 4000

# Command to run your app
CMD ["node", "dist/main.js"]
