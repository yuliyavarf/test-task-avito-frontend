# test-task-avito-frontend

# Установка зависимостей сервера
cd server
npm install express cors body-parser

# Установка зависимостей клиента
cd ../client
npm install

# В корневой папке проекта docker-compose.yml
docker-compose up --build

# После запуска контейнеров
# Сервер будет доступен по адресу http://localhost:3000
# Клиент будет доступен по адресу http://localhost:3001
