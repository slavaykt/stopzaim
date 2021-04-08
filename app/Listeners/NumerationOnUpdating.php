<?php

namespace App\Listeners;

use App\Events\onDocumentUpdating;
use Carbon\Carbon;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NumerationOnUpdating
{

  public function __construct()
  {
    //
  }

  public function handle(onDocumentUpdating $event)
  {
    $document = $event->document;
    if ($document->Номер) {
      $startOfPeriod = Carbon::createFromTimeString($document->Дата)->startOfYear()->toDateTimeString();
      $endOfPeriod = Carbon::createFromTimeString($document->Дата)->endOfYear()->toDateTimeString();
      $duplicates = get_class($document)::whereBetween('Дата', [$startOfPeriod, $endOfPeriod])->where('Номер', $document->Номер)->where('id', '<>', $document->id)->count();
      if ($duplicates > 0) {
        $document->Комментарий = 'Номер не уникальный';
        return false;
      }
    }
  }
}
