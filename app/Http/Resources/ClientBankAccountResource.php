<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClientBankAccountResource extends JsonResource
{

    public function toArray($request)
    {
        return [
          'id' => $this->id,
          'ВидСчета' => $this->ВидСчета,
          'ВидСчета' => $this->ВидСчета,
          'ВалютаСчета' => $this->ВалютаСчета,
          'НомерСчета' => $this->НомерСчета,
          'Банк' => new CompanyResource($this->bank), 
          'Остаток' => $this->Остаток,
          'ДатаОткрытия' => $this->ДатаОткрытия,
        ];
    }
}
