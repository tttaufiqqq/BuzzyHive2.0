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
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->text('notes')->nullable();
            $table->string('flora_type', 100)->nullable();
            $table->string('blooming_status', 100)->nullable();
            $table->string('weather_observation')->nullable();
            $table->timestamp('inspected_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inspections');
    }
};
