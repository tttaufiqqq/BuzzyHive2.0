<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inspection_flora', function (Blueprint $table) {
            $table->foreignId('inspection_id')->constrained('inspections')->cascadeOnDelete();
            $table->foreignId('flora_id')->constrained('master_flora_types')->cascadeOnDelete();
            $table->primary(['inspection_id', 'flora_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inspection_flora');
    }
};
