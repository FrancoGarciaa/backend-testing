# Imagen base de Node.js
FROM node:20

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json si existe
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Puerto en el que escucha tu app (ajustá si es otro)
EXPOSE 3131

# Comando de inicio
CMD ["npm", "start"]