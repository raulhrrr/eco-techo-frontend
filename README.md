# Frontend en Angular

## Ejecución local

1. Ejecutar el proyecto eco-techo-backend.

2. Asegurarse que las variables `baseUrl` y `socketUrl` del archivo `src/environments/environment.ts` sean correctas.

3. Ejecutar los siguientes comandos:

```
npm i -f
npm run start
```

## Ejecución en Docker

1. Ejecutar el proyecto eco-techo-backend.

2. Reemplazar las variables `baseUrl` y `socketUrl` del archivo `src/environments/environment.prod.ts`.

3. Ejecutar el siguiente comando:

```
docker compose up -d --build
```
