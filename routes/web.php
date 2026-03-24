<?php

use App\Http\Controllers\Auth\AcceptInviteController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn() => inertia('LandingPage'))->name('home');

Route::middleware(['auth', 'verified', 'beekeeper'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

// Invite acceptance — signed URL, no auth required
Route::get('invite/accept/{user}', [AcceptInviteController::class, 'show'])
    ->middleware('signed')
    ->name('invite.accept');

Route::post('invite/accept/{user}', [AcceptInviteController::class, 'store'])
    ->middleware('signed')
    ->name('invite.accept.store');

require __DIR__.'/settings.php';
