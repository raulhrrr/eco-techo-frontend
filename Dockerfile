# Construir la aplicación
FROM node:20.18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install -f
COPY . .
RUN npm run build:prod

# Servir la aplicación con un servidor web ligero
FROM nginx:alpine
COPY --from=build /app/dist/eco-techo-app/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
