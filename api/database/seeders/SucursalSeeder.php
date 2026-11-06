<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SucursalSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('sucursales')->insert([
            ['nombre' => 'Sucursal Central - Centro Histórico', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Sucursal Norte - Plaza Real', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Sucursal Poniente - Zona Rosa', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}