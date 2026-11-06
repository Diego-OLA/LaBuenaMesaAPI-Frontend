<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('nombre',100);
            $table->string('descripcion',200)->nullable(false);
            $table->decimal('precio',6,2)->nullable(false);
            $table->boolean('activo')->default(true);
            $table->foreignId('categoria_id')->nullable(false)->constrained('categorias')
              ->onDelete('restrict'); ;
             
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
