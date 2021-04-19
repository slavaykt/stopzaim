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

  public function client()
  {
    return $this->belongsTo(Client::class);
  }

  public function section()
  {
    return $this->belongsTo(ClientAttachmentSection::class, 'Раздел');
  }

  // public function scopeSelectingControlled($query)
  // {
  //   //   $users = $query::whereHas('Раздел', function($q) {
  //   //     $q->where('КонтролироватьСбор', '=', 1);
  //   // })->get();
  //   return $query::whereHas('Раздел', function ($q) {
  //     $q->where('КонтролироватьСбор', '=', 1);
  //   });
  // }
}
