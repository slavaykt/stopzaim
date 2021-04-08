<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientSettlementRegister extends Register
{
  use HasFactory;

  protected $guarded = [];

  protected $table = 'client_settlement_regs';

  public static $dimensions = [
    'Клиент',
  ];

  public function client()
  {
    return $this->belongsTo(Client::class, 'Клиент');
  }
}
