# Stage 1: Build the application
FROM node:21.7.3 AS builder

# Set working directory
WORKDIR /app

# Copy package management files first for caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN npm install -g pnpm \
    && pnpm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN pnpm run build

# Stage 2: Run the application
FROM node:21.7.3 AS runner

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app ./

# Install only production dependencies
RUN pnpm install --prod

# Expose the port Next.js will run on
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "start"]
