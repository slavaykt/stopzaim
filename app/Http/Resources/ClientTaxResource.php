<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClientTaxResource extends JsonResource
{

    public function toArray($request)
    {
      return [
        'id' => $this->id,
        'НаименованиеНалогаСбора' => $this->НаименованиеНалогаСбора,
        'Недоимка' => $this->Недоимка,
        'ШтрафыПени' => $this->ШтрафыПени,
      ];
    }
}
