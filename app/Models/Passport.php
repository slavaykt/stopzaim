<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Passport extends Model
{
  use HasFactory;

  protected $guarded = [];

  public $timestamps = false;

  protected $attributes = [
    'id' => null,
    'Серия' => '',
    'Номер' => '',
    'КемВыдано' => '',
    'ДатаВыдачи' =>  '0001-01-01',
    'КодПодразделения' => '',
  ];

  public function toString()
  {
    $issueDate = date("d.m.Y",strtotime($this->ДатаВыдачи));
    return <<<EOT
      паcпорт гражданина РФ серия $this->Серия номер $this->Номер, выданный $issueDate $this->КемВыдано код подр. $this->КодПодразделения
      EOT;
  }

}
