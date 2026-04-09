<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hri_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hive_id')->constrained()->cascadeOnDelete();
            $table->foreignId('sensor_log_id')->constrained()->cascadeOnDelete();
            $table->decimal('hri_score', 5, 2);
            $table->enum('hri_category', ['not_ready', 'approaching', 'nearly_ready', 'ready']);
            $table->decimal('s_hum',  4, 2)->nullable();
            $table->decimal('s_temp', 4, 2)->nullable();
            $table->decimal('s_etoh', 4, 2)->nullable();
            $table->decimal('s_co2',  4, 2)->nullable();
            $table->decimal('s_ch4',  4, 2)->nullable();
            $table->decimal('s_mq2',  4, 2)->nullable();
            $table->timestamp('computed_at');

            $table->index(['hive_id', 'computed_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hri_records');
    }
};
