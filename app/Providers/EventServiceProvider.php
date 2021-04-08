<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
  /**
   * The event listener mappings for the application.
   *
   * @var array
   */
  protected $listen = [
    Registered::class => [
      SendEmailVerificationNotification::class,
    ],
    'App\Events\onDocumentCreating' => [
      'App\Listeners\NumerationOnCreating',
    ],
    'App\Events\onDocumentUpdating' => [
      'App\Listeners\NumerationOnUpdating',
    ],
    'App\Events\onDocumentDeleted' => [
      'App\Listeners\ClearRegisterForDeletedDocument',
    ],
    'App\Events\onRegisterSaving' => [
      'App\Listeners\RecalculateBalance',
    ],
  ];

  /**
   * Register any events for your application.
   *
   * @return void
   */
  public function boot()
  {
    //
  }
}
