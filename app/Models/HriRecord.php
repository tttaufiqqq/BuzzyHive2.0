<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HriRecord extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'hive_id', 'sensor_log_id',
        'hri_score', 'hri_category',
        's_hum', 's_temp', 's_etoh', 's_co2', 's_ch4', 's_mq2',
        'computed_at',
    ];

    public function hive(): BelongsTo
    {
        return $this->belongsTo(Hive::class);
    }

    public function sensorLog(): BelongsTo
    {
        return $this->belongsTo(SensorLog::class);
    }
}
