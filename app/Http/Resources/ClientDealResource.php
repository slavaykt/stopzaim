<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class ClientDealResource extends JsonResource
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
      'Дата' => $this->Дата,
      'ВидСделки' => $this->ВидСделки,
      'Сумма' => $this->Сумма,
      'Основание' => $this->Основание,
      'Имущество' => 'dealable_type:'.$this->dealable_type."|".'dealable_id:'.$this->dealable_id
    ];
  }
}
