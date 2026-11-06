<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\Menu;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('menus')->insert([
            ['nombre' => 'menu infantil', 'sucursal_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Platos Fuertes', 'sucursal_id' => 1, 'created_at' => now(), 'updated_at' => now()],
        ]);

        $menuInfantil = Menu::where('nombre', 'menu infantil')->first();
        $platosFuertes = Menu::where('nombre', 'Platos Fuertes')->first();

        if ($menuInfantil) {
            $menuInfantil->items()->sync(
                Item::whereIn('categoria_id', [1, 3, 4])->pluck('id')
            );
        }

        if ($platosFuertes) {
            $platosFuertes->items()->sync(
                Item::where('categoria_id', 2)->pluck('id')
            );
        }
    }
}
