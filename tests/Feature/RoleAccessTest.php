<?php

use App\Models\User;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
    Role::firstOrCreate(['name' => 'beekeeper', 'guard_name' => 'web']);
});

test('guest is redirected to login when visiting admin dashboard', function () {
    $response = $this->get(route('admin.dashboard'));
    $response->assertRedirect(route('login'));
});

test('admin can access admin dashboard', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $response = $this->actingAs($admin)->get(route('admin.dashboard'));
    $response->assertOk();
});

test('beekeeper is redirected away from admin dashboard', function () {
    $beekeeper = User::factory()->create();
    $beekeeper->assignRole('beekeeper');

    $response = $this->actingAs($beekeeper)->get(route('admin.dashboard'));
    $response->assertRedirect(route('dashboard'));
});

test('admin is redirected away from beekeeper dashboard', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $response = $this->actingAs($admin)->get(route('dashboard'));
    $response->assertRedirect(route('admin.dashboard'));
});
