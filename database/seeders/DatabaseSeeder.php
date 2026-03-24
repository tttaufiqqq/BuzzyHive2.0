<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);

        $admin = User::firstOrCreate(
            ['email' => 'admin@buzzyhive.com'],
            [
                'name' => 'Admin',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        $admin->assignRole($adminRole);
    }
}
