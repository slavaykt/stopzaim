<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Address extends Model
{
  use HasFactory;

  protected $guarded = [];

  public $timestamps = false;

  protected $attributes = [
    'Индекс' => '',
    'Регион' => '',
    'Район' => '',
    'Город' => '',
    'НаселенныйПункт' => '',
    'Улица' => '',
    'Дом' => '',
    'Корпус' => '',
    'Квартира' => '',
    'РегионПоиск' => '',
    'РайонПоиск' => '',
    'ГородПоиск' => '',
    'НаселенныйПунктПоиск' => '',
    'УлицаПоиск' => '',
    'ДомПоиск' => '',
  ];

  public function getStringAttribute($value)
  {
    $addressString = '';
    if ($this->Индекс) {
      $addressString .= $this->Индекс . ", ";
    }
    if ($this->Регион) {
      $addressString .= $this->Регион . ", ";
    }
    if ($this->Район) {
      $addressString .= $this->Район . ", ";
    }
    if ($this->НаселенныйПункт) {
      $addressString .= $this->НаселенныйПункт . ", ";
    }
    if ($this->Улица) {
      $addressString .= $this->Улица . ", ";
    }

    if ($this->Дом) {
      $addressString .= 'дом ' . $this->Дом . ", ";
    }
    if ($this->Корпус) {
      $addressString .= 'корп. ' . $this->Корпус . ", ";
    }
    if ($this->Квартира) {
      $addressString .= 'кв. ' . $this->Квартира . ", ";
    }
    $addressString =  substr($addressString, 0, -2);

    return $addressString;
  }

}
