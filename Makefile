# Levanta toda la infraestructura en segundo plano
up:
	docker compose up -d

#  Baja todos los servicios
down:
	docker compose down

# Ejecuta las migraciones de Doctrine en el contenedor de Symfony
migrate:
	docker compose exec backend php bin/console doctrine:migrations:migrate --no-interaction

# Instala las dependencias de PHP (Composer) dentro del contenedor
install:
	docker compose exec backend composer install

# Muestra los logs en tiempo real de todos los servicios
logs:
	docker compose logs -f
