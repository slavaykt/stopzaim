<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientCreditor extends Model
{
    use HasFactory;

    protected $guarded = ['created_at', 'updated_at'];

    public function creditor()
    {
      return $this->belongsTo(Company::class, 'Кредитор');
    }

    public function client()
    {
      return $this->belongsTo(Client::class);
    }

    protected $attributes = [
      'id' => null,
      'client_id' => null,
      'СодержаниеОбязательства' => '',
      'Кредитор' => null,
      'ОснованиеВозникновения' => '',
      'СуммаВсего' => 0,
      'СуммаЗадолженность' => 0,
      'ШтрафыПени' => 0,
    ];

    public function relationships()
    {
      return [$this->creditor()];
    }
}
