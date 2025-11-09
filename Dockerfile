FROM node:20-bullseye

# Создаём рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --frozen-lockfile

# Копируем Prisma схему отдельно (чтобы кешировать слои Docker)
COPY prisma ./prisma

# Копируем остальной проект
COPY . .

# Генерация Prisma Client
RUN npx prisma generate
RUN npm run build

# Экспонируем порт NestJS
EXPOSE 3000

# Запуск приложения при старте контейнера
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]
