<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class IotNode extends Model
{
    protected $fillable = ['hive_id', 'device_id', 'status', 'registered_at'];

    public function hive(): BelongsTo
    {
        return $this->belongsTo(Hive::class);
    }

    public function sensorLogs(): HasMany
    {
        return $this->hasMany(SensorLog::class);
    }
}
