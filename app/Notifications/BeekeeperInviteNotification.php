<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BeekeeperInviteNotification extends Notification
{
    use Queueable;

    public function __construct(
        private readonly string $inviteUrl,
        private readonly string $invitedByName,
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('You\'ve been invited to BuzzyHive')
            ->greeting('Hello, ' . $notifiable->name . '!')
            ->line($this->invitedByName . ' has invited you to join BuzzyHive 2.0 — an IoT monitoring system for kelulut farming.')
            ->line('Click the button below to set your password and activate your account. This link expires in 7 days.')
            ->action('Set Up Your Account', $this->inviteUrl)
            ->line('If you were not expecting this invitation, you can ignore this email.');
    }
}
