<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class AcceptInviteController extends Controller
{
    public function show(Request $request, User $user): Response|RedirectResponse
    {
        if (! $user->isPending()) {
            return redirect()->route('login')->with('status', 'This invitation has already been used.');
        }

        return Inertia::render('auth/accept-invite', [
            'email' => $user->email,
            'userId' => $user->id,
        ]);
    }

    public function store(Request $request, User $user): RedirectResponse
    {
        if (! $user->isPending()) {
            return redirect()->route('login')->with('status', 'This invitation has already been used.');
        }

        $request->validate([
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user->update([
            'password' => Hash::make($request->password),
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        return redirect()->route('login')->with('status', 'Account activated! You can now sign in.');
    }
}
