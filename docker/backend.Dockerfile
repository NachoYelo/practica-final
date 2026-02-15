FROM php:8.2-fpm

# Instalar dependencias del sistema y extensiones PHP requeridas
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libicu-dev \
    && docker-php-ext-install pdo pdo_mysql intl zip

# Instalar Composer dentro del contenedor
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configurar directorio de trabajo
WORKDIR /app