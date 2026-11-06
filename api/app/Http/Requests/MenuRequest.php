<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class MenuRequest extends FormRequest
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
            'nombre'      => 'required|string|max:100',
            'sucursal_id' => 'required|integer|exists:sucursales,id',
            'items'       => ['required', 'array', 'min:1'],
            'items.*'     => [
                'required',
                'integer',
                'exists:items,id', // El item debe existir en la BD
                'distinct',        // Evita enviar el mismo ID repetido en el JSON (ej: [1, 2, 2])
            ],
            
        ];
    }
}
