# 🍽️ La Buena Mesa - RESTful API

API RESTful desarrollada en **Laravel** para la gestión de sucursales, categorías, ítems (platillos/bebidas) y menús mediante relaciones muchos a muchos.

---

## 📋 Requisitos Previos

Asegúrate de contar con los siguientes elementos en tu entorno local:

- **PHP** >= 8.3 (con extensiones `pdo`, `sqlite3`, `mbstring` habilitadas)
- **Composer** (Gestor de dependencias de PHP)
- **Git**
- Cliente para probar la API (**Postman**, **Insomnia**, o la extensión **Thunder Client** en VS Code)

---

## 🚀 Guía de Instalación Ejecución desde Cero

Sigue detalladamente estos pasos para levantar el proyecto localmente.

### 1. Clonar el repositorio e instalar dependencias

```bash
# 1. Clonar el repositorio
git clone <https://github.com/Diego-OLA/LaBuenaMesaAPI-RESTful.git>

# 2. Entrar a la carpeta del proyecto
cd LaBuenaMesaAPI-RESTful

# 3. Instalar dependencias de PHP
composer install

# Copiar el archivo de entorno de ejemplo
cp .env.example .env

# Generar la clave de la aplicación
php artisan key:generate
---
```
### 2.Tablas y datos de prueba
---
```bash
#Ejecutar las migraciones y los seeders
php artisan migrate:fresh --seed

```
Eso ejecutara las migraciones y insertara datos de items que son los platillos y bedidadas, tambien algunos menus,categorias y sucursales

### 3. Crear un Menú (`POST`)

Crea un nuevo menú asociándole múltiples platillos (ítems) a través de la tabla pivote.

* **Método:** `POST`
* **URL:** `http://127.0.0.1:8000/api/menu-items`
* **Headers:**
  ```http
  Content-Type: application/json
  Accept: application/json
  ```

#### Ejemplo de Cuerpo de la Petición (Body Raw JSON)

```json
{
  "nombre": "Menú Ejecutivo de Almuerzo",
  "sucursal_id": 1,
  "items": [1, 3, 5] 
}
```
items son los platillos, usa los que la estan insertados con el seeder, puedes verlos haciendo get a la ruta  `http://127.0.0.1:8000/api/items`

---

### 4. UPDATE Menu (`PUT`)

* **URL:** `http://127.0.0.1:8000/api/menu-items/3` 
Debes colocar en la url el id del menu que quieres actualizar

```json
{
  "nombre": "Menú Ejecutivo de Almuerzo",
  "sucursal_id": 1,
  "items": [1, 2, 5,6] 
}
```
Al hacer esto veras que se actualizará el registro.
De igual manera Si usas esa misma estructura en la URL pero usando Metodo GET obtendras el registro con el id que coloques en la URL

---

### 5. Estructura del Proyecto
```text
LaBuenaMesaAPI-RESTful/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── CategoriaController.php
│   │   │   ├── ItemController.php
│   │   │   ├── MenuController.php
│   │   │   └── SucursalController.php
│   │   └── Requests/
│   │       └── MenuRequest.php
|   |       |__ItemRequest.php
│   └── Models/
│       ├── Categoria.php
│       ├── Item.php
│       ├── Menu.php
│       └── Sucursal.php
│
├── database/
│   ├── factories/
│   │   ├── CategoriaFactory.php
│   │   ├── ItemFactory.php
│   │   ├── MenuFactory.php
│   │   └── SucursalFactory.php
│   ├── migrations/
│   │   ├── xxxx_xx_xx_xxxxxx_create_sucursales_table.php
│   │   ├── xxxx_xx_xx_xxxxxx_create_categorias_table.php
│   │   ├── xxxx_xx_xx_xxxxxx_create_items_table.php
│   │   ├── xxxx_xx_xx_xxxxxx_create_menus_table.php
│   │   └── xxxx_xx_xx_xxxxxx_create_menu_item_table.php  <-- Tabla Pivote
│   ├── seeders/
│   │   ├── CategoriaSeeder.php
│   │   ├── DatabaseSeeder.php
│   │   ├── ItemSeeder.php
│   │   ├── MenuSeeder.php
│   │   └── SucursalSeeder.php
│   └── database.sqlite  <-- Base de Datos SQLite
│
├── routes/
│   ├── api.php          <-- Rutas de la API (Route::apiResource)
│   ├── channels.php
│   ├── console.php
│   └── web.php
│
├── .env                 <-- Configuración local (DB_CONNECTION=sqlite)
├── .env.example
├── composer.json
└── README.md
```
