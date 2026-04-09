<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Hive extends Model
{
    protected $fillable = [
        'user_id', 'name', 'location', 'gps_lat', 'gps_lng',
        'colony_strength', 'queen_status', 'brood_status',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function iotNodes(): HasMany
    {
        return $this->hasMany(IotNode::class);
    }

    public function sensorLogs(): HasMany
    {
        return $this->hasMany(SensorLog::class);
    }

    public function hriRecords(): HasMany
    {
        return $this->hasMany(HriRecord::class);
    }

    public function summary(): HasOne
    {
        return $this->hasOne(HiveSummary::class);
    }
}
