<?php

use App\Http\Controllers\Auth\AcceptInviteController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $exists = \Illuminate\Support\Facades\Storage::disk('public')->exists('thesis/thesis.pdf');
    return inertia('LandingPage', [
        'thesisUrl' => $exists
            ? \Illuminate\Support\Facades\Storage::disk('public')->url('thesis/thesis.pdf')
            : null,
    ]);
})->name('home');

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
