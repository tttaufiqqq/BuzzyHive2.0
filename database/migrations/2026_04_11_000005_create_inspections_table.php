<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inspections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hive_id')->constrained()->cascadeOnDelete();
            $table->foreignId('beekeeper_id')->constrained('users')->cascadeOnDelete();
            $table->text('notes')->nullable();
            $table->string('blooming_status', 100)->nullable();
            $table->string('vegetation_density')->nullable();
            $table->string('nectar_source_availability')->nullable();
            $table->string('structural_damage')->nullable();
            $table->text('food_source_observation')->nullable();
            $table->date('inspection_date');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inspections');
    }
};
