<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/', function () {
    return Inertia::render('Home', [
        'posts' => Post::with('user:id,name')->latest()->get()
    ]);
})->middleware(['auth'])->name('home');

Route::resource('posts', PostController::class)->only(['create', 'store', 'edit', 'update', 'destroy'])->middleware('auth');

// /users/userid render all posts of the user

Route::get('/users/{id}', function ($id) {

    $user = User::find($id);

    if (!$user) {
        abort(404);
    }

    return Inertia::render('User/Posts', [
        'posts' => $user->posts()->with('user:id,name')->latest()->get(),
        'user' => $user
    ]);
})->middleware('auth')->name('user.posts');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
