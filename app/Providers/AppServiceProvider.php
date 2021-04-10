<?php

namespace App\Providers;

use App\Models\Client;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
  /**
   * Register any application services.
   *
   * @return void
   */
  public function register()
  {
    Schema ::defaultStringLength(256);
  }

  /**
   * Bootstrap any application services.
   *
   * @return void
   */
  public function boot()
  {


  }
}
