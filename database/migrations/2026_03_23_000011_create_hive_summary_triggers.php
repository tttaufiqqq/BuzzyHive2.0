<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::unprepared("
            CREATE TRIGGER after_hri_insert
            AFTER INSERT ON hri_records
            FOR EACH ROW
            BEGIN
                INSERT INTO hive_summary (hive_id, latest_hri_score, latest_category, updated_at)
                    VALUES (NEW.hive_id, NEW.hri_score, NEW.hri_category, NOW())
                ON DUPLICATE KEY UPDATE
                    latest_hri_score = NEW.hri_score,
                    latest_category  = NEW.hri_category,
                    avg_hri_7d       = (
                        SELECT AVG(hri_score) FROM hri_records
                        WHERE hive_id = NEW.hive_id
                          AND computed_at >= NOW() - INTERVAL 7 DAY
                    ),
                    avg_hri_30d      = (
                        SELECT AVG(hri_score) FROM hri_records
                        WHERE hive_id = NEW.hive_id
                          AND computed_at >= NOW() - INTERVAL 30 DAY
                    ),
                    updated_at       = NOW();
            END
        ");
    }

    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS after_hri_insert');
    }
};
