<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inspection_weather', function (Blueprint $table) {
            $table->foreignId('inspection_id')->constrained('inspections')->cascadeOnDelete();
            $table->foreignId('weather_id')->constrained('master_weather_conditions')->cascadeOnDelete();
            $table->primary(['inspection_id', 'weather_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inspection_weather');
    }
};
