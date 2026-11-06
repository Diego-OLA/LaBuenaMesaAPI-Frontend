#!/bin/sh
set -e

mkdir -p storage/logs storage/framework/cache/data \
         storage/framework/sessions storage/framework/views bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# ¿La base ya fue migrada alguna vez? Si no existe la tabla "migrations", es nueva.
if php artisan migrate:status >/dev/null 2>&1; then
    FRESH=0
else
    FRESH=1
fi

php artisan migrate --force

if [ "$FRESH" = "1" ]; then
    echo "Base de datos nueva: ejecutando seeders."
    php artisan db:seed --force
fi

exec php-fpm