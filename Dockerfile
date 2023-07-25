# Utilizar una versión más reciente de Node.js
FROM node:14

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración del proyecto
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el código fuente del proyecto al directorio de trabajo
COPY . .

# Aumentar los límites de archivos abiertos en el contenedor
RUN ulimit -n 65536

# Compilar la aplicación (si es necesario)
RUN npm run build

# Exponer el puerto en el que se ejecuta la aplicación (opcional, si tu aplicación utiliza el puerto 3000)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
