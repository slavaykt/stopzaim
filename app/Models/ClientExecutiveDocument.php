<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientExecutiveDocument extends Model
{
    use HasFactory;

    protected $guarded = ['created_at', 'updated_at'];

    protected $attributes = [
      'id' => null,
      'client_id' => null,
      'ВидДокумента' => '',
      'Дата' => null,
      'Номер' => '',
      'Исполнитель' => '',
      'Содержание' => '',
    ];

    public function relationships()
    {
      return [];
    }

    public function toString() {
      return $this->ВидДокумента." от ".date("d.m.Y", strtotime($this->Дата))." №".$this->Номер.", ".$this->Исполнитель.", ".$this->Содержание; 
    }
}
