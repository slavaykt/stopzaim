<?php

namespace App\Listeners;

use App\Events\onDocumentDeleted;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class ClearRegisterForDeletedDocument
{
    public function __construct()
    {
        //
    }

    public function handle(onDocumentDeleted $event)
    {
      $document = $event->document;
      $document->register->delete();
    }
}
