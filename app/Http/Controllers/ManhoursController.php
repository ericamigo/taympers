<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class ManhoursController extends Controller
{
    public function store(Task $task): RedirectResponse
    {
        $ongoingManhour = Auth::user()->ongoingManhour;

        if ($ongoingManhour) {
            $ongoingManhour->update([
                'ends_at' => Carbon::now(),
            ]);

            if ($task->id != $ongoingManhour->task_id) {
                Auth::user()->manhours()
                    ->create([
                        'starts_at' => Carbon::now(),
                        'task_id' => $task->id,
                    ]);
            }
        } else {
            Auth::user()->manhours()
                ->create([
                    'starts_at' => Carbon::now(),
                    'task_id' => $task->id,
                ]);
        }

        return Redirect::back();
    }
}
