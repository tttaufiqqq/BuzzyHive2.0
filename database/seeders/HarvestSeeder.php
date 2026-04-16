<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HarvestSeeder extends Seeder
{
    public function run(): void
    {
        $hives      = DB::table('hives')->get();
        $admin      = DB::table('users')->where('email', 'admin@buzzyhive.com')->first();
        $colorIds   = DB::table('master_honey_colors')->pluck('id')->toArray();
        $flavorIds  = DB::table('master_honey_flavors')->pluck('id')->toArray();

        $rows = [];
        foreach ($hives as $hive) {
            // 2 harvests per hive: at day 15 and day 28
            foreach ([15, 28] as $dayOffset) {
                $rows[] = [
                    'hive_id'           => $hive->id,
                    'beekeeper_id'      => $admin->id,
                    'harvest_date'      => now()->subDays(30 - $dayOffset)->toDateString(),
                    'weight'            => round(rand(350, 750) / 1, 1),
                    'productivity_level'=> $dayOffset === 28 ? 'high' : 'medium',
                    'color_id'          => $colorIds[array_rand($colorIds)],
                    'flavor_id'         => $flavorIds[array_rand($flavorIds)],
                    'notes'             => 'Routine harvest at day ' . $dayOffset,
                    'created_at'        => now()->subDays(30 - $dayOffset),
                ];
            }
        }

        DB::table('harvests')->insert($rows);
        $this->command->info('HarvestSeeder: ' . count($rows) . ' rows inserted.');
    }
}
