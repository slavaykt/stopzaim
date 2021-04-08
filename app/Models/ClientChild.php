<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientChild extends Model
{
    use HasFactory;

    protected $guarded = ['created_at', 'updated_at'];

    protected $attributes = [
      'id' => null,
      'client_id' => null,
      'ФИО' => '',
      'Пол' => '',
      'ДатаРождения' => '',
      'СвидетельствоСерия' => '',
      'СвидетельствоНомер' => '',
      'СвидетельствоДатаВыдачи' => '',
    ];

    public function relationships()
    {
      return [];
    }
}
