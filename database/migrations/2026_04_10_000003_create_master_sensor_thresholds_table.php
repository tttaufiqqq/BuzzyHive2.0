<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('master_sensor_thresholds', function (Blueprint $table) {
            $table->id();
            $table->string('sensor_type', 50);
            $table->float('min_value');
            $table->float('max_value');
            $table->string('level', 50);
            $table->text('meaning')->nullable();
            $table->text('recommended_action')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('master_sensor_thresholds');
    }
};
