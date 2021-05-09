<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClientCreditorResource extends JsonResource
{

    public function toArray($request)
    {
      return [
        'id' => $this->id,
        'СодержаниеОбязательства' => $this->СодержаниеОбязательства,
        'Кредитор' => new CompanyResource($this->creditor),
        'ОснованиеВозникновения' => $this->ОснованиеВозникновения,
        'СуммаВсего' => $this->СуммаВсего,
        'СуммаЗадолженность' => $this->СуммаЗадолженность,
        'ШтрафыПени' => $this->ШтрафыПени,
      ];
    }
}
