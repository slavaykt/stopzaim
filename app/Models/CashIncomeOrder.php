<?php

namespace App\Models;

use App\Events\onDocumentCreating;
use App\Events\onDocumentDeleted;
use App\Events\onDocumentUpdating;
use App\Events\onRegisterSaving;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class CashIncomeOrder extends Document
{
  use HasFactory;

  protected $guarded = ['created_at', 'updated_at'];

  protected $attributes = [
    'id' => null,
    'registered' => 0,
    'Номер' => 0,
    'Клиент' => null,
    'ВидОперации' => 'Поступление от клиента',
    'ПринятоОт' => '',
    'Сумма' => 0,
    'ОснованиеПлатежа' => '',
    'Комментарий' => '',
  ];

  public function client()
  {
    return $this->belongsTo(Client::class, 'Клиент');
  }

  public function getTypeAttribute()
  {
    return 'Приходный кассовый ордер';
  }

  public function registerCash()
  {
    return $this->morphOne(CashRegister::class, 'registerable');
  }

  public function registerClientSettlement()
  {
    return $this->morphOne(ClientSettlementRegister::class, 'registerable');
  }

  protected static function boot()
  {
    parent::boot();

    static::deleted(function ($document) {
      if (isset($document->registerCash)) {
        $document->registerCash()->delete();
        event(new onRegisterSaving($document->Дата, 'App\Models\CashRegister', [[]]));
      }
      if (isset($document->registerClientSettlement)) {
        logger('deleting settlement...');
        $document->registerClientSettlement()->delete();
      }
    });
  }
}
