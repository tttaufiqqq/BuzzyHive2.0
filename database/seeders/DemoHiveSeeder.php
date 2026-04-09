<?php

namespace Database\Seeders;

use App\Models\Hive;
use App\Models\IotNode;
use App\Models\User;
use Illuminate\Database\Seeder;

class DemoHiveSeeder extends Seeder
{
    public function run(): void
    {
        // Grab the admin user (already seeded)
        $admin = User::where('email', 'admin@buzzyhive.com')->first();

        if (!$admin) {
            $this->command->error('Admin user not found. Run DatabaseSeeder first.');
            return;
        }

        $hive = Hive::firstOrCreate(
            ['name' => 'Demo Hive 1'],
            [
                'user_id'         => $admin->id,
                'location'        => 'Lab',
                'colony_strength' => 'moderate',
                'queen_status'    => 'unknown',
                'brood_status'    => 'unknown',
            ]
        );

        IotNode::firstOrCreate(
            ['device_id' => 'NODE-001'],
            [
                'hive_id'       => $hive->id,
                'status'        => 'active',
                'registered_at' => now(),
            ]
        );

        $this->command->info("Hive ID: {$hive->id} | NODE-001 registered.");
    }
}
