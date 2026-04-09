<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hives', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('location')->nullable();
            $table->decimal('gps_lat', 10, 7)->nullable();
            $table->decimal('gps_lng', 10, 7)->nullable();
            $table->enum('colony_strength', ['weak', 'moderate', 'strong'])->default('moderate');
            $table->enum('queen_status', ['present', 'absent', 'unknown'])->default('unknown');
            $table->enum('brood_status', ['active', 'inactive', 'unknown'])->default('unknown');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hives');
    }
};
