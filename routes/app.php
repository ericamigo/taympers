<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TasksController;
use App\Http\Controllers\JobOrdersController;
use App\Http\Controllers\ManhoursController;

Route::prefix('/job-orders')->name('job-orders.')->group(function () {
    Route::get('/', [JobOrdersController::class, 'index'])->name('index');
    Route::get('/create', [JobOrdersController::class, 'create'])->name('create');
    Route::post('/', [JobOrdersController::class, 'store'])->name('store');
    Route::get('/{jobOrder}', [JobOrdersController::class, 'show'])->name('show');
});

Route::prefix('/tasks')->name('tasks.')->group(function () {
    Route::get('/', [TasksController::class, 'index'])->name('index');
    Route::post('/{jobOrder}', [TasksController::class, 'store'])->name('store');
});

Route::prefix('/manhours')->name('manhours.')->group(function () {
    Route::post('/{task}', [ManhoursController::class, 'store'])->name('store');
});
