<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manhour extends Model
{
    use HasFactory;

    protected $fillable = [
        'starts_at',
        'ends_at',
        'task_id',
        'user_id',
    ];
}