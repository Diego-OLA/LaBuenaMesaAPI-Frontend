<?php

namespace App\Http\Controllers;
use App\Models\Menu;
use App\Models\Sucursal;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    //
    public function index(){
       return Item::with('categoria','menus')->activo()->paginate(20);
    }





}
