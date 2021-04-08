<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Document
{
    use HasFactory;

    protected $guarded = ['created_at', 'updated_at'];

    protected $attributes = [
      'id' => null,
      'registered' => 0,
      'Номер' => 0,
      'Клиент' => null,
      'Сумма' => 0,
      'Комментарий' => '',
    ];

    public $collections = [
      'ГрафикПлатежей' => 'payments',
    ];

    public function client()
    {
      return $this->belongsTo(Client::class, 'Клиент');
    }

    public function payments()
    {
      return $this->hasMany(ContractPayment::class);
    }

    public function register()
    {
        return $this->morphOne(ClientSettlementRegister::class, 'registerable');
    }

    protected static function boot()
    {
      parent::boot();
  
      static::deleted(function ($document) {
        if (isset($document->register)) {
          $document->register()->delete();
        }
      });
    }
}
