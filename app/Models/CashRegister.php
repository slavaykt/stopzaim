<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class CashRegister extends Register
{
  use HasFactory;

  protected $guarded = [];

  public static $dimensions = [];

}
