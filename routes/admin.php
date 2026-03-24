<?php

use App\Http\Controllers\Admin\BeekeeperController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {

    Route::get('/', function () {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'total'   => User::role('beekeeper')->count(),
                'pending' => User::role('beekeeper')->where('status', 'pending')->count(),
                'active'  => User::role('beekeeper')->where('status', 'active')->count(),
            ],
        ]);
    })->name('dashboard');

    Route::get('/beekeepers', [BeekeeperController::class, 'index'])->name('beekeepers.index');
    Route::post('/beekeepers', [BeekeeperController::class, 'store'])->name('beekeepers.store');
    Route::patch('/beekeepers/{user}', [BeekeeperController::class, 'update'])->name('beekeepers.update');
    Route::patch('/beekeepers/{user}/toggle-status', [BeekeeperController::class, 'toggleStatus'])->name('beekeepers.toggle-status');
    Route::post('/beekeepers/{user}/resend-invite', [BeekeeperController::class, 'resendInvite'])->name('beekeepers.resend-invite');
});
