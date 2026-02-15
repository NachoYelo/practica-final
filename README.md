# ⚽ Aplicación Web de Fútbol - LaLiga

Aplicación web full-stack para gestionar equipos de fútbol de LaLiga con sistema de favoritos.

## 🚀 Tecnologías

- **Backend**: PHP 8.2 + Symfony 6.x
- **Frontend**: Angular 21 (Standalone Components)
- **Base de datos**: MySQL 8.0
- **Servidor web**: Nginx
- **Contenedores**: Docker & Docker Compose

## 📋 Requisitos previos

- Docker
- Docker Compose
- Node.js 18+ (para desarrollo local del frontend)
- PHP 8.2+ (para desarrollo local del backend)

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio-url>
cd practica-final
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
# Edita .env con tus credenciales
```

### 3. Configurar backend

```bash
cd backend
cp .env .env.local
# Edita .env.local con la URL de conexión a la base de datos:
# DATABASE_URL="mysql://app:app_pass@db:3306/proyecto_futbol"
```

### 4. Levantar los contenedores Docker

```bash
docker compose up -d
```

### 5. Aplicar migraciones de base de datos

```bash
docker compose exec backend php bin/console doctrine:migrations:migrate
```

### 6. Inicializar datos de prueba (opcional)

```bash
docker compose exec db mysql -u root -p$(grep DB_PASSWORD .env | cut -d'=' -f2) proyecto_futbol < backend/db/setup.sql
```

### 7. Compilar el frontend

```bash
cd frontend
npm install
npm run build
```

### 8. Reiniciar el servidor web

```bash
docker compose restart webserver
```

## 🌐 Acceso a la aplicación

- **Aplicación principal**: http://localhost
- **Portainer**: http://localhost:9443
- **Ngrok Dashboard** (si está configurado): http://localhost:4040

## 👤 Usuario de prueba

- **Usuario**: demo
- **Contraseña**: demo123

## 📁 Estructura del proyecto

```
.
├── backend/           # API REST con Symfony
│   ├── src/
│   │   ├── Controller/
│   │   ├── Entity/
│   │   └── Repository/
│   └── public/
├── frontend/          # SPA con Angular
│   └── src/
│       └── app/
├── docker/            # Configuración Docker
│   ├── backend.Dockerfile
│   └── nginx/
└── compose.yml        # Orquestación de servicios
```

## 🔧 Comandos útiles

### Backend (Symfony)

```bash
# Acceder al contenedor del backend
docker compose exec backend bash

# Crear una nueva migración
docker compose exec backend php bin/console make:migration

# Limpiar caché
docker compose exec backend php bin/console cache:clear
```

### Frontend (Angular)

```bash
# Modo desarrollo
cd frontend
npm start

# Compilar para producción
npm run build
```

### Base de datos

```bash
# Acceder a MySQL
docker compose exec db mysql -u root -p

# Backup de la base de datos
docker compose exec db mysqldump -u root -proot proyecto_futbol > backup.sql
```

## 🎯 Funcionalidades

- ✅ Sistema de registro e inicio de sesión
- ✅ Visualización de 20 equipos de LaLiga
- ✅ Marcar equipos como favoritos
- ✅ Diseño responsive y moderno
- ✅ API REST con autenticación por token

## 📝 Licencia

Este proyecto es de código abierto para fines educativos.
