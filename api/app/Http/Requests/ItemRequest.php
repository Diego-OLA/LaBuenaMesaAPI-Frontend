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
            'nombre'       => 'required|string|max:100',
            'descripcion'  => 'required|string|max:200',
            'activo'       => 'sometimes|boolean',
            'precio'       => 'required|numeric',
            'categoria_id' => 'required|integer|exists:categorias,id',
        ];
    }
}
