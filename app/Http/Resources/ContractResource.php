<?php

namespace App\Http\Resources;

use App\Models\ContractPayment;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class ContractResource extends JsonResource
{

  public function toArray($request)
    {
      return [
        'id' => $this->id,
        'Дата' => Carbon::parse($this->Дата)->format('Y-m-d\TH:i'),
        'Номер' => $this->Номер,
        'Клиент' => $this->client,
        'Сумма' => $this->Сумма,
        'Комментарий' => $this->Комментарий,
        'ВидДокумента' => 'Договор',
        'ГрафикПлатежей'=> $this->payments,
        'registered' => $this->registered,
        'schema' => [
          'ГрафикПлатежей' => new ContractPaymentResource(new ContractPayment),
        ],
      ];
    }
}
