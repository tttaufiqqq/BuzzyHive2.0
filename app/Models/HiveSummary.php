<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HiveSummary extends Model
{
    const CREATED_AT = null;

    protected $table = 'hive_summary';

    protected $fillable = [
        'hive_id',
        'latest_hri_score', 'latest_category',
        'avg_hri_7d', 'avg_hri_30d',
        'last_harvest_date', 'total_harvests',
    ];

    public function hive(): BelongsTo
    {
        return $this->belongsTo(Hive::class);
    }
}
