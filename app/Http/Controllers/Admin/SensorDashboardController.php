<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hive;
use App\Models\SensorLog;
use Carbon\Carbon;
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

        $date = $request->input('date'); // nullable Y-m-d — overrides window when set

        $query = SensorLog::where('hive_id', $hiveId)
            ->orderBy('recorded_at')
            ->select('temp', 'humidity', 'smoke_adc', 'recorded_at');

        if ($date && preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
            $day = Carbon::parse($date);
            $hours = match ($window) {
                '6h'  => 6,
                '24h' => 24,
                default => 1,
            };
            $query->whereBetween('recorded_at', [
                $day->copy()->endOfDay()->subHours($hours),
                $day->copy()->endOfDay(),
            ]);
        } else {
            $since = match ($window) {
                '6h'  => now()->subHours(6),
                '24h' => now()->subHours(24),
                default => now()->subHour(),
            };
            $query->where('recorded_at', '>=', $since);
        }

        $logs = $query->limit(500)->get();

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
            'date'     => $date ?? null,
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
