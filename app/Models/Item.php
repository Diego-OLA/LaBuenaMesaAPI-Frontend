<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'activo',
        'categoria_id',
      
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function menus()
    {
       return $this->belongsToMany(Menu::class,'menu_item')->withTimestamps();
    }

    public function scopeActivo($query){
        return $query->where('activo',true);
    }
}