<?php

namespace App\Http\Controllers;

use App\Models\JobOrder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class JobOrdersController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('JobOrders/Index', [
            'jobOrders' => JobOrder::query()
                ->with([
                    'manhours' => function ($query) {
                        $query
                            ->with('task')
                            ->selectRaw("
                                tasks.job_order_id, TIME_FORMAT(SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(ends_at, starts_at)))), '%H:%i') AS total_duration
                            ")
                            ->groupBy('job_order_id');
                    }
                ])
                ->latest()
                ->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('JobOrders/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        try {
            $jobOrder = JobOrder::create($request->only(
                'name',
            ));
        } catch (\Throwable $th) {
            return Redirect::back()
                ->withError($th->getMessage());
        }

        return Redirect::route('job-orders.show', $jobOrder);
    }

    public function show(JobOrder $jobOrder): Response
    {
        return Inertia::render('JobOrders/Show', [
            'jobOrder' => $jobOrder,
            'tasks' => $jobOrder->tasks()
                ->with([
                    'manhours' => function ($query) {
                        $query
                            ->selectRaw("
                                task_id, TIME_FORMAT(SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(ends_at, starts_at)))), '%H:%i') AS total_duration
                            ")
                            ->groupBy('task_id');
                    }
                ])
                ->withCount('manhours')
                ->latest()
                ->get(),
        ]);
    }
}
