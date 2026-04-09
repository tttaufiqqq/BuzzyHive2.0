<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hive_summary', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hive_id')->unique()->constrained()->cascadeOnDelete();
            $table->decimal('latest_hri_score', 5, 2)->nullable();
            $table->enum('latest_category', ['not_ready', 'approaching', 'nearly_ready', 'ready'])->nullable();
            $table->decimal('avg_hri_7d', 5, 2)->nullable();
            $table->decimal('avg_hri_30d', 5, 2)->nullable();
            $table->date('last_harvest_date')->nullable();
            $table->unsignedInteger('total_harvests')->default(0);
            $table->timestamp('updated_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hive_summary');
    }
};
