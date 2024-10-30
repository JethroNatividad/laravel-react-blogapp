<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{

    public function create(): Response
    {
        return Inertia::render('Posts/Create');
    }

    public function store(StorePostRequest $request): RedirectResponse
    {
        $request->user()->posts()->create($request->validated());

        return redirect()->route('home');
    }
}
