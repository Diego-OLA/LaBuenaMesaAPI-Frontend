<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
       
        return [
            'nombre' => 'string|max:100',
            'descripcion' => 'required|string|max:200',
            'activo' => 'boolean',
            'precio' => 'numeric|required',
            'categoria_id' => 'required|exists:categorias,id',
            'items'       => 'required|array|min:1',
        
        
        'items.*'     => [
            'required',
            'integer',
            'exists:items,id', // Verifica que el platillo exista en la BD
            'distinct',        // IMPIDE duplicados dentro del mismo arreglo enviado (ej: [1, 2, 2] fallará)
        ],

        ];
    }
}
