<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
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

    public function edit($id): Response
    {
        $post = Post::find($id);

        if (!$post) {
            abort(404);
        }

        Gate::authorize('update', $post);

        return Inertia::render('Posts/Edit', [
            'post' => $post,
        ]);
    }

    public function update(StorePostRequest $request, Post $post): RedirectResponse
    {
        Gate::authorize('update', $post);

        $post->update($request->validated());

        return redirect()->route('home');
    }

    public function destroy(Post $post): RedirectResponse
    {
        Gate::authorize('delete', $post);

        $post->delete();

        return redirect()->route('home');
    }
}
