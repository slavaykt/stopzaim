<?php

namespace App\Models;

use App\Events\onDocumentCreating;
use App\Events\onDocumentUpdating;
use App\Events\onDocumentDeleted;
use App\Events\onRegisterSaving;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CashExpenseOrder extends Document
{
  use HasFactory;

  protected $guarded = ['created_at', 'updated_at'];

  protected $attributes = [
    'id' => null,
    'registered' => 0,
    'Номер' => 0,
    'Клиент' => null,
    'ВидОперации' => 'Прочий расход',
    'Выдано' => '',
    'Сумма' => 0,
    'ОснованиеПлатежа' => '',
    'Комментарий' => '',
  ];

  public function client()
  {
    return $this->belongsTo(Client::class, 'Клиент');
  }

  public function registerCash()
  {
      return $this->morphOne(CashRegister::class, 'registerable');
  }

  public function registerClientSettlement()
  {
    return $this->morphOne(ClientSettlement::class, 'registerable');
  }

  public function getTypeAttribute()
  {
    return 'Расходный кассовый ордер';
  }

  protected static function boot()
  {
    parent::boot();

    static::deleted(function ($document) {
      if (isset($document->registerCash)) {
        $document->registerCash()->delete();
        event(new onRegisterSaving($document->Дата, 'App\Models\CashRegister', [[]]));
      }
    });
  }
  
}
