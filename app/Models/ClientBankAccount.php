<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientBankAccount extends Model
{
  use HasFactory;

  protected $guarded = ['created_at', 'updated_at'];

  protected $attributes = [
    'id' => null,
    'client_id' => null,
    'ВидСчета' => '',
    'ВалютаСчета' => '',
    'НомерСчета' => '',
    'Банк' => null,
    'Остаток' => 0,
    'ДатаОткрытия' => null,
  ];

  public static function create(array $attr = array())
  {
    $out = 1;
    return $out;
  }

  public function relationships()
  {
    return [$this->bank()];
  }

  public function bank()
  {
    return $this->belongsTo(Company::class, 'Банк');
  }

  public function client()
  {
    return $this->belongsTo(Client::class);
  }
}
