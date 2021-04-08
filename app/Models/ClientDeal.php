<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientDeal extends Model
{
  use HasFactory;

  public $timestamps = false;

  protected $guarded = [];

  protected $attributes = [
    'id' => null,
    'client_id' => null,
    'ВидСделки' => '',
    'Сумма' => 0,
    'Основание' => '',
  ];

  public function dealable()
  {
    return $this->morphTo();
  }

  public function relationships()
  {
    return [];
  }

}
