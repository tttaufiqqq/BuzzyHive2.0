<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBeekeeperRequest;
use App\Http\Requests\Admin\UpdateBeekeeperRequest;
use App\Models\User;
use App\Notifications\BeekeeperInviteNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class BeekeeperController extends Controller
{
    public function index(): Response
    {
        $beekeepers = User::role('beekeeper')
            ->with('invitedBy:id,name')
            ->orderByDesc('created_at')
            ->paginate(20);

        return Inertia::render('admin/beekeepers/index', [
            'beekeepers' => $beekeepers,
            'stats' => [
                'total'   => User::role('beekeeper')->count(),
                'pending' => User::role('beekeeper')->where('status', 'pending')->count(),
                'active'  => User::role('beekeeper')->where('status', 'active')->count(),
            ],
        ]);
    }

    public function store(StoreBeekeeperRequest $request): RedirectResponse
    {
        $beekeeper = User::create([
            'name'       => $request->name,
            'email'      => $request->email,
            'phone'      => $request->phone,
            'password'   => null,
            'status'     => 'pending',
            'invited_by' => $request->user()->id,
        ]);

        $beekeeper->assignRole(Role::findByName('beekeeper'));

        $inviteUrl = URL::temporarySignedRoute(
            'invite.accept',
            now()->addDays(7),
            ['user' => $beekeeper->id]
        );

        $beekeeper->notify(new BeekeeperInviteNotification($inviteUrl, $request->user()->name));

        return redirect()->route('admin.beekeepers.index')
            ->with('success', "Invite sent to {$beekeeper->email}.");
    }

    public function update(UpdateBeekeeperRequest $request, User $user): RedirectResponse
    {
        $user->update($request->only(['name', 'email', 'phone']));

        return redirect()->route('admin.beekeepers.index')
            ->with('success', 'Beekeeper updated.');
    }

    public function toggleStatus(User $user): RedirectResponse
    {
        $user->update([
            'status' => $user->isActive() ? 'deactivated' : 'active',
        ]);

        $action = $user->fresh()->isActive() ? 'reactivated' : 'deactivated';

        return redirect()->route('admin.beekeepers.index')
            ->with('success', "Beekeeper {$action}.");
    }

    public function resendInvite(User $user): RedirectResponse
    {
        if (! $user->isPending()) {
            return redirect()->route('admin.beekeepers.index')
                ->with('error', 'Invite can only be resent to pending users.');
        }

        $inviteUrl = URL::temporarySignedRoute(
            'invite.accept',
            now()->addDays(7),
            ['user' => $user->id]
        );

        $admin = request()->user();
        $user->notify(new BeekeeperInviteNotification($inviteUrl, $admin->name));

        return redirect()->route('admin.beekeepers.index')
            ->with('success', "Invite resent to {$user->email}.");
    }
}
