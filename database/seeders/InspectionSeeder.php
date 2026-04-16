<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InspectionSeeder extends Seeder
{
    public function run(): void
    {
        $hives      = DB::table('hives')->get();
        $admin      = DB::table('users')->where('email', 'admin@buzzyhive.com')->first();
        $weatherIds = DB::table('master_weather_conditions')->pluck('id')->toArray();
        $floraIds   = DB::table('master_flora_types')->pluck('id')->toArray();

        foreach ($hives as $hive) {
            foreach ([10, 25] as $dayOffset) {
                $inspectionId = DB::table('inspections')->insertGetId([
                    'hive_id'                   => $hive->id,
                    'beekeeper_id'              => $admin->id,
                    'notes'                     => 'Routine inspection at day ' . $dayOffset,
                    'blooming_status'           => $dayOffset >= 20 ? 'peak_bloom' : 'early_bloom',
                    'vegetation_density'        => 'moderate',
                    'nectar_source_availability'=> $dayOffset >= 20 ? 'abundant' : 'moderate',
                    'structural_damage'         => null,
                    'food_source_observation'   => 'Bees active, foraging observed near site.',
                    'inspection_date'           => now()->subDays(30 - $dayOffset)->toDateString(),
                    'created_at'                => now()->subDays(30 - $dayOffset),
                    'updated_at'                => now()->subDays(30 - $dayOffset),
                ]);

                // 1 weather condition per inspection
                DB::table('inspection_weather')->insert([
                    'inspection_id' => $inspectionId,
                    'weather_id'    => $weatherIds[array_rand($weatherIds)],
                ]);

                // 2 flora types per inspection
                $shuffled = $floraIds;
                shuffle($shuffled);
                $selectedFlora = array_slice($shuffled, 0, 2);
                foreach ($selectedFlora as $floraId) {
                    DB::table('inspection_flora')->insert([
                        'inspection_id' => $inspectionId,
                        'flora_id'      => $floraId,
                    ]);
                }
            }
        }

        $this->command->info('InspectionSeeder: ' . ($hives->count() * 2) . ' inspections inserted.');
    }
}
