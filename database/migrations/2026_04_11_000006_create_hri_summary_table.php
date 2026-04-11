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
            $table->foreignId('hive_id')->constrained()->cascadeOnDelete();
            $table->date('summary_date');
            $table->float('avg_temperature')->nullable();
            $table->float('avg_humidity')->nullable();
            $table->float('avg_mq2')->nullable();
            $table->string('latest_label', 50)->nullable();
            $table->float('latest_confidence')->nullable();
            $table->unsignedInteger('harvest_count')->default(0);
            $table->timestamp('updated_at')->nullable();

            $table->unique(['hive_id', 'summary_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hri_summary');
    }
};
