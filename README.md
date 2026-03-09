# Chatbot

Un chatbot inteligente construido con Node.js y OpenAI.

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
OPENAI_API_KEY=your_openai_api_key
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

## Ejecución

Desarrollo (con nodemon):
```bash
npm run dev
```

Producción:
```bash
npm start
```

## Estructura del Proyecto

```
src/
├── controllers/    # Controladores de la aplicación
├── routes/         # Rutas de la API
├── services/       # Lógica de negocio
├── db/            # Conexión a la base de datos
└── app.js         # Configuración de Express
```

## Licencia

ISC



