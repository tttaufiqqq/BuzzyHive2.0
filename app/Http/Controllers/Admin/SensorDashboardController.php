<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hive;
use App\Models\SensorLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SensorDashboardController extends Controller
{
    public function index(Request $request)
    {
        $hives = Hive::select('id', 'name')->orderBy('name')->get();

        $hiveId = $request->integer('hive_id') ?: $hives->first()?->id;

        $window = in_array($request->input('window'), ['1h', '6h', '24h'])
            ? $request->input('window')
            : '1h';

        $since = match ($window) {
            '6h'  => now()->subHours(6),
            '24h' => now()->subHours(24),
            default => now()->subHour(),
        };

        $logs = SensorLog::where('hive_id', $hiveId)
            ->where('recorded_at', '>=', $since)
            ->orderBy('recorded_at')
            ->select('temp', 'humidity', 'smoke_adc', 'recorded_at')
            ->limit(200)
            ->get();

        $latest = $logs->last();

        $history = $logs->map(fn ($log) => [
            'time'        => $log->recorded_at->format('H:i'),
            'temperature' => round($log->temp, 1),
            'humidity'    => round($log->humidity, 1),
            'mq2'         => $log->smoke_adc,
        ])->values();

        return Inertia::render('admin/sensors', [
            'hives'    => $hives,
            'selected' => $hiveId,
            'window'   => $window,
            'latest'   => $latest ? [
                'temperature' => round($latest->temp, 1),
                'humidity'    => round($latest->humidity, 1),
                'mq2'         => $latest->smoke_adc,
                'recorded_at' => $latest->recorded_at->diffForHumans(),
            ] : null,
            'history'  => $history,
        ]);
    }
}
