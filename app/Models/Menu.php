<?php

namespace App\Models;
use App\Models\Item;
use App\Models\Sucursal;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'sucursal_id',
    ];

   public function items()
    {
        return $this->belongsToMany(Item::class,'menu_item')->withTimestamps();
    }

    public function sucursal()
    {
        return $this->belongsTo(Sucursal::class);
    }

}
