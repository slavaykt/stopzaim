<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class CashOrderResource extends JsonResource
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
      'ОтКогоКому' => $this->type === 'Приходный кассовый ордер' ? $this->ПринятоОт : $this->Выдано,
      'Приход' => $this->type === 'Приходный кассовый ордер' ? $this->Сумма : 0,
      'Расход' => $this->type === 'Расходный кассовый ордер' ? $this->Сумма : 0,
      'ОснованиеПлатежа' => $this->ОснованиеПлатежа,
      'Комментарий' => $this->Комментарий,
      'ВидДокумента' => $this->type,
      'Остаток' =>  $this->registerCash ? $this->registerCash->СуммаОстаток : '',
      'registered' => $this->registered
    ];
  }
}
