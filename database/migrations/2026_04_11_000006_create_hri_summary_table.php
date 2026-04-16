<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hri_summary', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hive_id')->constrained()->cascadeOnDelete()->unique();
            $table->float('avg_temperature')->nullable();
            $table->float('avg_humidity')->nullable();
            $table->float('avg_mq2')->nullable();
            $table->unsignedInteger('harvest_count')->default(0);
            $table->string('latest_readiness_level', 50)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hri_summary');
    }
};
