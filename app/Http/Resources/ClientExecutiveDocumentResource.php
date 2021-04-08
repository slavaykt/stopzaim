<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClientExecutiveDocumentResource extends JsonResource
{
    public function toArray($request)
    {
      return [
        'id' => $this->id,
        'ВидДокумента' => $this->ВидДокумента,
        'Дата' => $this->Дата,
        'Номер' => $this->Номер,
        'Исполнитель' => $this->Исполнитель,
        'Содержание' => $this->Содержание,
      ];
    }
}
