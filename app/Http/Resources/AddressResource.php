<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
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
      'индекс' => $this->Индекс,
      'регион' => [
        'viewName' => $this->Регион,
        'searchName' => $this->РегионПоиск
      ],
      'район' => [
        'viewName' => $this->Район,
        'searchName' => $this->РайонПоиск
      ],
      'город' => [
        'viewName' => $this->Город,
        'searchName' => $this->ГородПоиск
      ],
      'населенныйПункт' => [
        'viewName' => $this->НаселенныйПункт,
        'searchName' => $this->НаселенныйПунктПоиск
      ],
      'улица' => [
        'viewName' => $this->Улица,
        'searchName' => $this->УлицаПоиск
      ],
      'дом' => [
        'viewName' => $this->Дом,
        'searchName' => $this->ДомПоиск
      ],
      'корпус' => $this->Корпус,
      'квартира' => $this->Квартира,
    ];
  }
}
