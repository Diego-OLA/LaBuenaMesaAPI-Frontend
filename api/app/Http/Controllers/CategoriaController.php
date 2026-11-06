<?php

namespace App\Http\Controllers;

use App\Models\Categoria;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'message' => 'Categorias obtenidas',
            'data'    => Categoria::orderBy('nombre')->get(),
        ], 200);
    }
}
