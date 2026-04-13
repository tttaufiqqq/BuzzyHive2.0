<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class SensorLog extends Model
{
    const UPDATED_AT = null;

    protected $casts = [
        'recorded_at' => 'datetime',
    ];

    protected $fillable = [
        'hive_id', 'iot_node_id',
        'temp', 'humidity',
        'etoh_adc', 'co2_adc', 'ch4_adc', 'smoke_adc',
        'recorded_at',
    ];

    public function hive(): BelongsTo
    {
        return $this->belongsTo(Hive::class);
    }

    public function iotNode(): BelongsTo
    {
        return $this->belongsTo(IotNode::class);
    }

    public function hriRecord(): HasOne
    {
        return $this->hasOne(HriRecord::class);
    }
}
