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


services/
│
├ ai.service.js          → interpreta intención
├ chat.service.js        → orquesta todo
├ expense.service.js     → registrar gastos
├ income.service.js      → registrar ingresos
├ query.service.js       → consultas
├ category.service.js    → categorías
├ goal.service.js        → metas
└ finance.service.js     → conversación financiera
```

## Funciona
1. registro gasto y su consulta
2. registro ingreso y su consulta
3. resumen global (gastos totales, ingresos totales, balance)
4. preguntar cualquier cosa sin salirse del tema de las finanzas





## Faltantes

1. consultas por categoria tipo (cuabto gaste en transporte este mes, o listame los gastos de este mes x categoria)
2. crear las metas(ya estan pero no reconoce el nombre de la meta )
3. conectar con el frontend
4. mensaje de bienvenida(hola soy pocky tu asistente financiero, que quieres hacer el dia de hoy?)  

