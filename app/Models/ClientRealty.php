<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientRealty extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $guarded = [];

    protected $attributes = [
      'id' => null,
      'client_id' => null,
      'Наименование' => '',
      'ВидИмущества' => '',
      'ВидСобственности' => '',
      'Площадь' => 0,
      'ОснованиеПриобретения' => '',
      'СведенияОЗалоге' => '',
      'АдресOld' => ''
    ];

    public function getTypeAttribute()
    {
        return 'realty';
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
