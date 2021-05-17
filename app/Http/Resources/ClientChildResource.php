<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClientChildResource extends JsonResource
{

    public function toArray($request)
    {
      return [
        'id' => $this->id,
        'ФИО' => $this->ФИО,
        'Пол' => $this->Пол,
        'ДатаРождения' => $this->ДатаРождения,
      ];
    }
}
