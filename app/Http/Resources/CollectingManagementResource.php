<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CollectingManagementResource extends JsonResource
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
      'Клиент' => $this->client,
      'Кредитор' => isset($this->creditor) ? $this->creditor : null,
      'ОснованиеВозникновения' => isset($this->ОснованиеВозникновения) ? $this->ОснованиеВозникновения : null,
      'Тип' => isset($this->creditor) ? 'Справка о задолженности' : $this->section->Наименование,
      'Наличие' => $this->Наличие
    ];
  }
}
