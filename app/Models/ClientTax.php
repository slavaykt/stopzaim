<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientTax extends Model
{
    use HasFactory;

    protected $guarded = ['created_at', 'updated_at'];

    protected $attributes = [
      'id' => null,
      'client_id' => null,
      'НаименованиеНалогаСбора' => '',
      'Недоимка' => 0,
      'ШтрафыПени' => 0,
    ];

    public function relationships()
    {
      return [];
    }
}
