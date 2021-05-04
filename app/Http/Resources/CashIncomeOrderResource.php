<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class CashIncomeOrderResource extends JsonResource
{

  public function toArray($request)
  {
    return [
      'id' => $request->copy ? null : $this->id,
      'Дата' => $request->copy ? Carbon::now()->format('Y-m-d\TH:i') : Carbon::parse($this->Дата)->format('Y-m-d\TH:i'),
      'Номер' => $request->copy ? 0 : $this->Номер,
      'Клиент' => $this->client,
      'ВидОперации' => $this->ВидОперации,
      'ПринятоОт' => $this->ПринятоОт,
      'Сумма' => $this->Сумма,
      'ОснованиеПлатежа' => $this->ОснованиеПлатежа,
      'Комментарий' => $this->Комментарий,
      'ВидДокумента' => 'Приходный кассовый ордер',
      'registered' => $request->copy ? 0 : $this->registered
    ];
  }
}
