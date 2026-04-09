<?php

namespace App\Http\Controllers;

use App\Models\IotNode;
use App\Models\SensorLog;
use App\Models\HriRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SensorController extends Controller
{
    public function store(Request $request)
    {
        // ── Auth ──────────────────────────────────────────────────
        if ($request->header('X-API-Key') !== config('app.iot_api_key')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // ── Validate ──────────────────────────────────────────────
        $data = $request->validate([
            'device_id'  => 'required|string',
            'hive_id'    => 'required|integer|exists:hives,id',
            'temp'       => 'required|numeric|between:-10,60',
            'humidity'   => 'required|numeric|between:0,100',
            'smoke_adc'  => 'required|integer|between:0,4095',
            'etoh_adc'   => 'nullable|integer|between:0,4095',
            'co2_adc'    => 'nullable|integer|between:0,4095',
            'ch4_adc'    => 'nullable|integer|between:0,4095',
        ]);

        // ── Resolve IoT Node ──────────────────────────────────────
        $node = IotNode::where('device_id', $data['device_id'])
                       ->where('hive_id',   $data['hive_id'])
                       ->where('status',    'active')
                       ->first();

        if (!$node) {
            return response()->json(['error' => 'Device not registered'], 404);
        }

        DB::transaction(function () use ($data, $node) {
            // ── Store sensor log ──────────────────────────────────
            $log = SensorLog::create([
                'hive_id'     => $data['hive_id'],
                'iot_node_id' => $node->id,
                'temp'        => $data['temp'],
                'humidity'    => $data['humidity'],
                'smoke_adc'   => $data['smoke_adc'],
                'etoh_adc'    => $data['etoh_adc']  ?? null,
                'co2_adc'     => $data['co2_adc']   ?? null,
                'ch4_adc'     => $data['ch4_adc']   ?? null,
                'recorded_at' => now(),
            ]);

            // ── Compute HRI ───────────────────────────────────────
            $scores = $this->computeHri(
                $data['temp'],
                $data['humidity'],
                $data['etoh_adc']  ?? 0,
                $data['co2_adc']   ?? 0,
                $data['ch4_adc']   ?? 0,
                $data['smoke_adc']
            );

            // ── Store HRI record (trigger auto-updates hive_summary)
            HriRecord::create([
                'hive_id'       => $data['hive_id'],
                'sensor_log_id' => $log->id,
                'hri_score'     => $scores['total'],
                'hri_category'  => $this->classify($scores['total']),
                's_hum'         => $scores['s_hum'],
                's_temp'        => $scores['s_temp'],
                's_etoh'        => $scores['s_etoh'],
                's_co2'         => $scores['s_co2'],
                's_ch4'         => $scores['s_ch4'],
                's_mq2'         => $scores['s_mq2'],
                'computed_at'   => now(),
            ]);
        });

        return response()->json(['status' => 'ok'], 201);
    }

    // ── HRI Formula ───────────────────────────────────────────────
    private function computeHri(
        float $temp,
        float $humidity,
        int   $etoh,
        int   $co2,
        int   $ch4,
        int   $smoke
    ): array {
        $s_hum  = $this->scoreHumidity($humidity);
        $s_temp = $this->scoreTemp($temp);
        $s_etoh = $this->scoreEtoh($etoh);
        $s_co2  = $this->scoreCo2($co2);
        $s_ch4  = $this->scoreCh4($ch4);
        $s_mq2  = $this->scoreMq2($smoke);

        $total = (
            (0.30 * $s_hum)  +
            (0.25 * $s_etoh) +
            (0.15 * $s_temp) +
            (0.15 * $s_co2)  +
            (0.10 * $s_ch4)  +
            (0.05 * $s_mq2)
        ) * 10;

        return compact('s_hum', 's_temp', 's_etoh', 's_co2', 's_ch4', 's_mq2', 'total');
    }

    private function scoreHumidity(float $rh): float
    {
        if ($rh <= 60) return 10;
        if ($rh <= 70) return 10 - (($rh - 60) / 10) * 3;
        if ($rh <= 80) return 7  - (($rh - 70) / 10) * 3;
        return 1;
    }

    private function scoreTemp(float $t): float
    {
        if ($t >= 28 && $t <= 32) return 10;
        if (($t >= 24 && $t < 28) || ($t > 32 && $t <= 36)) return 6;
        return 2;
    }

    private function scoreEtoh(int $adc): float
    {
        if ($adc >= 200 && $adc <= 400) return 10;
        if (($adc >= 100 && $adc < 200) || ($adc > 400 && $adc <= 600)) return 6;
        if ($adc < 100) return 3;
        return 2;
    }

    private function scoreCo2(int $adc): float
    {
        if ($adc >= 200 && $adc <= 500) return 10;
        if (($adc >= 100 && $adc < 200) || ($adc > 500 && $adc <= 700)) return 6;
        if ($adc < 100) return 3;
        return 1;
    }

    private function scoreCh4(int $adc): float
    {
        if ($adc < 200)  return 10;
        if ($adc <= 400) return 6;
        return 2;
    }

    private function scoreMq2(int $adc): float
    {
        if ($adc < 150)  return 10;
        if ($adc <= 300) return 6;
        return 1;
    }

    private function classify(float $score): string
    {
        if ($score >= 80) return 'ready';
        if ($score >= 60) return 'nearly_ready';
        if ($score >= 40) return 'approaching';
        return 'not_ready';
    }
}
