<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
         DB::table('menus')->insert([
            ['nombre' => 'menu infantil', 'sucursal_id'=>1, 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Platos Fuertes', 'sucursal_id'=>1, 'created_at' => now(), 'updated_at' => now()],
           
        ]);
    }
}
