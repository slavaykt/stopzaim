<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class CashIncomeOrderResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function toArray($request)
  {
    return [
      'id' => $this->id,
      'Дата' => Carbon::parse($this->Дата)->format('Y-m-d\TH:i'),
      'Номер' => $this->Номер,
      'Клиент' => $this->client,
      'ВидОперации' => $this->ВидОперации,
      'ПринятоОт' => $this->ПринятоОт,
      'Сумма' => $this->Сумма,
      'ОснованиеПлатежа' => $this->ОснованиеПлатежа,
      'Комментарий' => $this->Комментарий,
      'ВидДокумента' => 'Приходный кассовый ордер',
      'registered' => $this->registered
    ];
  }
}
