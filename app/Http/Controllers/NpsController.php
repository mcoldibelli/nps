<?php

namespace App\Http\Controllers;

use App\Models\nps;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;

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

        return Redirect::route('nps.index')->with('success', 'Agradecemos a sua avaliação!');
    }

    public function show()
    {
        $nps = DB::table('nps')->get();
        return response()->json($nps);
    }
}