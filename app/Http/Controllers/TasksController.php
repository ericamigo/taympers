<?php

namespace App\Http\Controllers;

use App\Models\JobOrder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class TasksController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Tasks/Index');
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
