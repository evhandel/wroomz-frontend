# Stage 1: Build the React app
FROM node:20-alpine AS builder

WORKDIR /app

# Accept build-time environment variables from Railway
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the app (REACT_APP_* vars are baked in here)
RUN yarn build

# Stage 2: Serve with nginx (much lighter than Node.js)
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx config template
COPY nginx.conf /etc/nginx/nginx.conf.template

# Use PORT env variable from Railway (default 80 for local)
ENV PORT=80

# Start nginx with envsubst to replace $PORT
CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]

