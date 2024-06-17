<?php

namespace App\Http\Controllers;

use App\Models\nps;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;


class NpsController extends Controller
{

    public function index(): Response
    {
        return Inertia::render('Nps/Index', []);
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'score' => 'required|integer|min:-1|max:1',
        ]);

        Nps::create([
            'score' => $validatedData['score'],
        ]);

        return Redirect::back()->with('success', 'Thank you for your feedback!');
    }

    public function show(nps $nps)
    {
        return Inertia::render('Nps/Show', [
            'nps' => $nps,
        ]);
    }
}
