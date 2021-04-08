<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClientAttachmentResource extends JsonResource
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
      // 'Раздел' => $this->section
      'Раздел' => $this->section ? $this->section->id : "",
    ];
  }
}
