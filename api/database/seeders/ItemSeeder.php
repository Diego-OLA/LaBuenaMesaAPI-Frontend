<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('items')->insert([
            // Entradas (categoria_id: 1)
            [
                'nombre' => 'Empanadas de Carne',
                'descripcion' => '2 empanadas de carne cortada a cuchillo con salsa criolla.',
                'precio' => 4.50,
                'activo' => true,
                'categoria_id' => 1,
               
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Papas Bastón con Queso Cheddar',
                'descripcion' => 'Papas fritas crujientes bañadas en queso cheddar y panceta.',
                'precio' => 5.90,
                'activo' => true,
                'categoria_id' => 1,
                
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Platos Fuertes (categoria_id: 2)
            [
                'nombre' => 'Hamburguesa Clásica',
                'descripcion' => ' Carne de res 180g, queso cheddar, lechuga, tomate y salsa especial.',
                'precio' => 8.50,
                'activo' => true,
                'categoria_id' => 2,
                
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Pizza Pepperoni Familiar',
                'descripcion' => 'Masa artesanal con salsa de tomate, queso mozzarella y pepperoni.',
                'precio' => 12.00,
                'activo' => true,
                'categoria_id' => 2,
                
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Postres (categoria_id: 3)
            [
                'nombre' => 'Cheesecake de Frutos Rojos',
                'descripcion' => 'Pastel de queso crema sobre base de galleta con mermelada de la casa.',
                'precio' => 4.25,
                'activo' => true,
                'categoria_id' => 3,
               
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Bebidas (categoria_id: 4)
            [
                'nombre' => 'Limonada de Menta y Jengibre',
                'descripcion' => 'Limonada natural 500ml endulzada con miel.',
                'precio' => 2.50,
                'activo' => true,
                'categoria_id' => 4,
               
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}