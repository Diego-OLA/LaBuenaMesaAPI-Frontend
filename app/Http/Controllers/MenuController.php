<?php

namespace App\Http\Controllers;
use App\Models\Menu;
use App\Models\Item;
use App\Http\Requests\MenuRequest;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Menu::with(['items','sucursal'])->paginate(25);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(MenuRequest $request)
    {
        $validated = $request->validated();
       $menu = Menu::create([
        'nombre'      => $validated['nombre'],
        'sucursal_id' => $validated['sucursal_id'],
    ]);

    
    $menu->items()->attach($validated['items']);

        return response()->json([
            'message' => 'Menu creado exitosamente',
            'data'    => $menu->load('items','sucursal'),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $menu = Menu::with('items','sucursal')->findOrfail($id);

        return response()->json([
            'message'=> 'Menu Obtenido',
            'data' => $menu
        ],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MenuRequest $request, $id )
    {
       
  $menu = Menu::findOrFail($id);

    $validated = $request->validated();

    
    $menu->update([
        'nombre'      => $validated['nombre'],
        'sucursal_id' => $validated['sucursal_id'],
    ]);

    // Sincronizar usando explícitamente la relación desde el modelo ya existente
    if (isset($validated['items'])) {
        $menu->items()->sync($validated['items']);
    }

    return response()->json([
        'message' => 'Menú actualizado exitosamente',
        'data'    => $menu->load('sucursal', 'items'),
    ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

    try {
         $menu = Menu::findOrFail($id);
         $menu->delete();
        return response()->json([
            'message' => 'Menu eliminado exitosamente',
        ], 200);
    } catch (QueryException $e) {
        return response()->json([
            'message' => 'No se puede eliminar el menú porque está asociado a otros registros activos.',
        ], 409); // Código HTTP 409: Conflict
    }

      

    
    }
}
