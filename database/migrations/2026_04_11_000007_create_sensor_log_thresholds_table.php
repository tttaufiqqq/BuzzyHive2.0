<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sensor_log_thresholds', function (Blueprint $table) {
            $table->foreignId('sensor_log_id')->constrained('sensor_logs')->cascadeOnDelete();
            $table->foreignId('threshold_id')->constrained('master_sensor_thresholds')->cascadeOnDelete();
            $table->primary(['sensor_log_id', 'threshold_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sensor_log_thresholds');
    }
};
