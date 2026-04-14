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
            $table->foreignId('hive_id')->constrained()->cascadeOnDelete()->unique();
            $table->float('latest_hri_score')->nullable();
            $table->string('latest_category', 50)->nullable();
            $table->float('avg_hri_7d')->nullable();
            $table->float('avg_hri_30d')->nullable();
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
