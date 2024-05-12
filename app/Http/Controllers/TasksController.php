<?php

namespace App\Http\Controllers;

use App\Models\JobOrder;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class TasksController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Tasks/Index', [
            'tasks' => Task::query()
                ->with([
                    'jobOrder',
                    'manhours' => function ($query) {
                        $query->selectRaw('
                            *, ends_at - starts_at as duration
                        ');
                    },
                ])
                ->latest()
                ->get(),
        ]);
    }

    public function store(Request $request, JobOrder $jobOrder): RedirectResponse
    {
        $jobOrder->tasks()
            ->create($request->only(
                'name',
            ));

        return Redirect::back();
    }
}
