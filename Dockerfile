FROM node:16-alpine AS builder

# Set working directory
WORKDIR /app

# Increase Node memory limit
ENV NODE_OPTIONS="--max_old_space_size=4096"

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Add ARGs for build-time environment variables
ARG REACT_APP_API_URL
ARG REACT_APP_AUTH_DOMAIN
# Add other ARGs as needed

# Set environment variables for the build
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
# Set other environment variables as needed

# Build for production
RUN npm run build

# Production image
FROM node:16-alpine

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Copy build files from builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Install serve to run the application
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the application in production mode
CMD ["serve", "-s", "build", "-l", "3000", "--no-clipboard", "--single"] 