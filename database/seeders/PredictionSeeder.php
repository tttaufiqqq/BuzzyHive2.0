<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PredictionSeeder extends Seeder
{
    public function run(): void
    {
        $logs = DB::table('sensor_logs')->orderBy('record_timestamp')->get();
        $start = now()->subDays(30);
        $rows = [];

        foreach ($logs as $log) {
            $dayNumber = (int) $start->diffInDays($log->record_timestamp);
            $dayNumber = max(0, min(29, $dayNumber));

            [$level, $hriValue] = $this->resolveLevel($dayNumber);

            $rows[] = [
                'sensor_log_id'        => $log->id,
                'hive_id'              => $log->hive_id,
                'readiness_level'      => $level,
                'hri_value'            => $hriValue,
                'prediction_timestamp' => $log->record_timestamp,
            ];
        }

        foreach (array_chunk($rows, 100) as $chunk) {
            DB::table('predictions')->insert($chunk);
        }

        $this->command->info('PredictionSeeder: ' . count($rows) . ' rows inserted.');
    }

    private function resolveLevel(int $day): array
    {
        // Progress: not_ready → approaching → nearly_ready → ready over 30 days
        $hriBase = round(0.2 + ($day / 29) * 0.75 + (rand(-5, 5) / 100), 2);
        $hriBase = max(0.1, min(0.99, $hriBase));

        if ($day <= 7) {
            $level = rand(1, 10) <= 8 ? 'not_ready' : 'approaching';
        } elseif ($day <= 17) {
            $r = rand(1, 10);
            $level = $r <= 5 ? 'not_ready' : ($r <= 9 ? 'approaching' : 'nearly_ready');
        } elseif ($day <= 24) {
            $r = rand(1, 10);
            $level = $r <= 2 ? 'approaching' : ($r <= 8 ? 'nearly_ready' : 'ready');
        } else {
            $level = rand(1, 10) <= 9 ? 'ready' : 'nearly_ready';
        }

        return [$level, $hriBase];
    }
}
