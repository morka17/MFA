# Build stage
FROM node:lts-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies, including Prisma CLI
RUN npm ci

# Install Prisma CLI globally
RUN npm install -g prisma

# Copy the application files
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the TypeScript code
RUN npm run build

# Prune dev dependencies
RUN npm prune --production

# Production stage
FROM node:18-alpine AS production

# Set the working directory
WORKDIR /app

# Copy built files and production dependencies from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Copy Prisma schema and generated client
COPY --from=builder /app/prisma ./prisma

# Expose the port that the application will run on
EXPOSE 3000

# Command to run your app
CMD ["node", "dist/main.js"]