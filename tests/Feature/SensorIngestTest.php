<?php

use App\Models\Hive;
use App\Models\HriRecord;
use App\Models\IotNode;
use App\Models\SensorLog;
use App\Models\User;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    Role::firstOrCreate(['name' => 'beekeeper', 'guard_name' => 'web']);
    config(['app.iot_api_key' => 'test-api-key']);
});

test('valid sensor data returns 201 and stores sensor log with hri record', function () {
    $user = User::factory()->create();
    $user->assignRole('beekeeper');
    $hive = Hive::create(['user_id' => $user->id, 'name' => 'Hive A']);
    IotNode::create([
        'hive_id'       => $hive->id,
        'device_id'     => 'ESP32-001',
        'status'        => 'active',
        'registered_at' => now(),
    ]);

    $response = $this->postJson('/api/sensor-data', [
        'device_id' => 'ESP32-001',
        'hive_id'   => $hive->id,
        'temp'      => 30,
        'humidity'  => 55,
        'smoke_adc' => 100,
        'etoh_adc'  => 300,
        'co2_adc'   => 350,
        'ch4_adc'   => 150,
    ], ['X-API-Key' => 'test-api-key']);

    $response->assertStatus(201);
    expect(SensorLog::count())->toBe(1);
    expect(HriRecord::count())->toBe(1);
});

test('hri record is linked to its sensor log', function () {
    $user = User::factory()->create();
    $user->assignRole('beekeeper');
    $hive = Hive::create(['user_id' => $user->id, 'name' => 'Hive B']);
    IotNode::create([
        'hive_id'       => $hive->id,
        'device_id'     => 'ESP32-002',
        'status'        => 'active',
        'registered_at' => now(),
    ]);

    $this->postJson('/api/sensor-data', [
        'device_id' => 'ESP32-002',
        'hive_id'   => $hive->id,
        'temp'      => 29,
        'humidity'  => 60,
        'smoke_adc' => 80,
    ], ['X-API-Key' => 'test-api-key']);

    $log = SensorLog::first();
    $record = HriRecord::first();

    expect($record->sensor_log_id)->toBe($log->id);
    expect($record->hive_id)->toBe($hive->id);
});

test('request without api key returns 401', function () {
    $response = $this->postJson('/api/sensor-data', [
        'device_id' => 'ESP32-001',
        'hive_id'   => 1,
        'temp'      => 30,
        'humidity'  => 55,
        'smoke_adc' => 100,
    ]);

    $response->assertStatus(401);
});

test('request with wrong api key returns 401', function () {
    $response = $this->postJson('/api/sensor-data', [
        'device_id' => 'ESP32-001',
        'hive_id'   => 1,
        'temp'      => 30,
        'humidity'  => 55,
        'smoke_adc' => 100,
    ], ['X-API-Key' => 'wrong-key']);

    $response->assertStatus(401);
});

test('unknown device returns 404', function () {
    $user = User::factory()->create();
    $hive = Hive::create(['user_id' => $user->id, 'name' => 'Hive C']);

    $response = $this->postJson('/api/sensor-data', [
        'device_id' => 'UNKNOWN-DEVICE',
        'hive_id'   => $hive->id,
        'temp'      => 30,
        'humidity'  => 55,
        'smoke_adc' => 100,
    ], ['X-API-Key' => 'test-api-key']);

    $response->assertStatus(404);
});
