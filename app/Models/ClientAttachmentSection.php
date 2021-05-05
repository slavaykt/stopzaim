<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientAttachmentSection extends Model
{
    use HasFactory;

    protected $attributes = [
      'id' => null,
      'Наименование' => '',
      'ТекстДляПечати' => '',
      'ТекстПриложения' => '',
      'ТекстОтсутствиеПриложения' => '',
      'Порядок' => 0,
      'КонтролироватьСбор' => 0,
    ];

    protected $guarded = [];

    public $timestamps = false;

    public function attachments()
    {
      return $this->hasMany(ClientAttachment::class,'Раздел');
    }

}
