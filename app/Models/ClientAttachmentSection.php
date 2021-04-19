<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientAttachmentSection extends Model
{
    use HasFactory;

    protected $guarded = [];

    public $timestamps = false;

    public function attachments()
    {
      return $this->hasMany(ClientAttachment::class,'Раздел');
    }

}
