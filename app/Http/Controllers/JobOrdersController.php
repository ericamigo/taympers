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
                        $query->selectRaw('
                            *, ends_at - starts_at as duration
                        ');
                    },
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
                        $query->selectRaw('
                            *, ends_at - starts_at as duration
                        ');
                    },
                ])
                ->withCount('manhours')
                ->latest()
                ->get(),
        ]);
    }
}
