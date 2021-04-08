<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientAttachment extends Model
{
    use HasFactory;

    protected $guarded = [];

    public $timestamps = false;

    protected $attributes = [
      'id' => null,
      'Наименование' => '',
      'Раздел' => '',
    ];

    public function relationships()
    {
      return [];
    }

    public function section()
    {
      return $this->belongsTo(ClientAttachmentSection::class,'Раздел');
    }
}
