# Multi-stage Dockerfile for Create React App + nginx

# Stage 1: build the React app
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --silent

# Copy source
COPY . .

# Build-time ARG for CRA envs (must be prefixed with REACT_APP_)
ARG REACT_APP_TMDB_API_KEY
ENV REACT_APP_TMDB_API_KEY=$REACT_APP_TMDB_API_KEY

# Build production assets
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:stable-alpine

# Remove default nginx config and add our SPA config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
