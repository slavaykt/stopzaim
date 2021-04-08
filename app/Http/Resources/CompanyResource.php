<?php

namespace App\Http\Resources;

use App\Models\Address;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyResource extends JsonResource
{

    public function toArray($request)
    {
      return [
        'id' => $this->id,
        'Наименование' => $this->Наименование,
        'ИНН' => $this->ИНН,
        'ОГРН' => $this->ОГРН,
        'КПП' => $this->КПП,
        'Адрес' => new AddressResource($this->address ? $this->address : new Address),
      ];
    }
}
