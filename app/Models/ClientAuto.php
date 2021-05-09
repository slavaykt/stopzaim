<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientAuto extends Model
{
  use HasFactory;

  public $timestamps = false;

  protected $guarded = [];

  protected $attributes = [
    'id' => null,
    'client_id' => null,
    'Наименование' => '',
    'ВидТС' => '',
    'ВидСобственности' => '',
    'Стоимость' => 0,
    'ГодВыпуска' => '',
    'ИдентификационныйНомер' => '',
    'СведенияОЗалоге' => '',
    'АдресOld' => ''
  ];

  public function getTypeAttribute()
  {
      return 'auto';
  }

  public function relationships()
  {
    return [];
  }

  public function deals()
  {
    return $this->morphMany(ClientDeal::class, 'dealable');
  }

  public function address()
  {
    return $this->morphOne(Address::class, 'registerable');
  }
}
