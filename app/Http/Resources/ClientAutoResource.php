<?php

namespace App\Http\Resources;

use App\Models\Address;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientAutoResource extends JsonResource
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
        'ВидТС' => $this->ВидТС,
        'ВидСобственности' => $this->ВидСобственности,
        'Стоимость' => $this->Стоимость,
        'ГодВыпуска' => $this->ГодВыпуска,
        'ИдентификационныйНомер' => $this->ИдентификационныйНомер,
        'СведенияОЗалоге' => $this->СведенияОЗалоге,
        'АдресOld' => $this->АдресOld,
        'Адрес' => new AddressResource($this->address ? $this->address : new Address()),
      ];
    }
}
