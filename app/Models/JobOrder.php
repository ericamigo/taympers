<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class JobOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    /**
     * Relationship Methods
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    public function manhours(): HasManyThrough
    {
        return $this->hasManyThrough(Manhour::class, Task::class);
    }
}
