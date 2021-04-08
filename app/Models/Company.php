<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Company extends General
{
  use HasFactory;

  protected $guarded = ['created_at', 'updated_at', 'Налоговая', 'МестоРаботы', 'СРО', 'АрбитражныйСуд'];

  protected $attributes = [
    'id' => null,
    'isGroup' => false,
    'parent_id' => null,
    'Наименование' => '',
    'ИНН' => '',
    'ОГРН' => '',
    'КПП' => '',
  ];

  public function address()
  {
    return $this->morphOne(Address::class, 'registerable');
  }

}
