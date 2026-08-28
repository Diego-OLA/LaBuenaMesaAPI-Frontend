<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sucursal extends Model
{
    use HasFactory;

    protected $table = 'sucursales'; // Especificado explícitamente para evitar problemas de pluralización

    protected $fillable = ['nombre'];

    public function menus()
    {
        return $this->hasMany(Menu::class);
    }
}