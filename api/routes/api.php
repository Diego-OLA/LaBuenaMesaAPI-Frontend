<?php


use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');




Route::apiResource('menu-items', MenuController::class);
Route::apiResource('items', ItemController::class);
Route::apiResource('categorias', CategoriaController::class)->only(['index']);


