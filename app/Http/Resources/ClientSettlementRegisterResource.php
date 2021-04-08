<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientSettlementRegisterResource extends JsonResource
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
      'Регистратор' => $this->registerable_type::find($this->registerable_id),
      'СуммаПриход' => $this->СуммаПриход,
      'СуммаРасход' => $this->СуммаРасход,
      'СуммаОстаток' => $this->СуммаОстаток,
    ];
  }
}
