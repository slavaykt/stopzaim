<?php

namespace App\Http\Resources;

use App\Models\Address;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientRealtyResource extends JsonResource
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
        'Наименование' => $this->Наименование,
        'ВидИмущества' => $this->ВидИмущества,
        'ВидСобственности' => $this->ВидСобственности,
        'Площадь' => $this->Площадь,
        'ОснованиеПриобретения' => $this->ОснованиеПриобретения,
        'СведенияОЗалоге' => $this->СведенияОЗалоге,
        'АдресOld' => $this->АдресOld,
        'Адрес' => new AddressResource($this->address ? $this->address : new Address),
      ];
    }
}
