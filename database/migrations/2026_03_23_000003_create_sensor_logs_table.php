<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sensor_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hive_id')->constrained()->cascadeOnDelete();
            $table->foreignId('iot_node_id')->constrained()->cascadeOnDelete();
            $table->decimal('temp', 5, 2)->nullable();
            $table->decimal('humidity', 5, 2)->nullable();
            $table->unsignedSmallInteger('etoh_adc')->nullable();
            $table->unsignedSmallInteger('co2_adc')->nullable();
            $table->unsignedSmallInteger('ch4_adc')->nullable();
            $table->unsignedSmallInteger('smoke_adc')->nullable();
            $table->timestamp('recorded_at');
            $table->timestamp('created_at')->nullable();

            $table->index(['hive_id', 'recorded_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sensor_logs');
    }
};
