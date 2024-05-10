<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TasksController;
use App\Http\Controllers\JobOrdersController;

Route::prefix('/job-orders')->name('job-orders.')->group(function () {
    Route::get('/', [JobOrdersController::class, 'index'])->name('index');
});

Route::prefix('/tasks')->name('tasks.')->group(function () {
    Route::get('/', [TasksController::class, 'index'])->name('index');
});
