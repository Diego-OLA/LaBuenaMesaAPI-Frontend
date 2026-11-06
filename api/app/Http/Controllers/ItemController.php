<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemRequest;
use App\Models\Item;
use Illuminate\Database\QueryException;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Item::with('categoria', 'menus')->activo()->paginate(20);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ItemRequest $request)
    {
        $item = Item::create($request->validated());

        return response()->json([
            'message' => 'Item creado exitosamente',
            'data'    => $item->load('categoria', 'menus'),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $item = Item::with('categoria', 'menus')->findOrFail($id);

        return response()->json([
            'message' => 'Item obtenido',
            'data'    => $item,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ItemRequest $request, string $id)
    {
        $item = Item::findOrFail($id);

        $item->update($request->validated());

        return response()->json([
            'message' => 'Item actualizado exitosamente',
            'data'    => $item->load('categoria', 'menus'),
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $item = Item::findOrFail($id);
            $item->delete();

            return response()->json([
                'message' => 'Item eliminado exitosamente',
            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'No se puede eliminar el item porque está asociado a otros registros activos.',
            ], 409);
        }
    }
}
