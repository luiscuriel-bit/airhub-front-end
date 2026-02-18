# Build stage
FROM node:20-slim AS build
ARG VITE_BACKEND_SERVER_URL
ENV VITE_BACKEND_SERVER_URL=$VITE_BACKEND_SERVER_URL
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
