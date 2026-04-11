<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('predictions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sensor_log_id')->constrained()->cascadeOnDelete();
            $table->foreignId('hive_id')->constrained()->cascadeOnDelete();
            $table->enum('label', ['not_ready', 'approaching', 'nearly_ready', 'ready']);
            $table->float('confidence');
            $table->timestamp('predicted_at');

            $table->index(['hive_id', 'predicted_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('predictions');
    }
};
