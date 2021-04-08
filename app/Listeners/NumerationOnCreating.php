<?php

namespace App\Listeners;

use App\Events\onDocumentCreating;
use Carbon\Carbon;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NumerationOnCreating
{

    public function __construct()
    {
        //
    }

     public function handle(onDocumentCreating $event)
    {
      $document = $event->document;
      $startOfPeriod = Carbon::createFromTimeString($document->Дата)->startOfYear()->toDateTimeString();
      $endOfPeriod = Carbon::createFromTimeString($document->Дата)->endOfYear()->toDateTimeString();
      if (!$document->Номер) {
        $last_num = get_class($document)::whereBetween('Дата', [$startOfPeriod, $endOfPeriod])->orderBy('Номер', 'asc')->get()->last();
        $document->Номер = $last_num ? $last_num->Номер + 1 : 1;
      } else {
        $duplicates =  get_class($document)::whereBetween('Дата', [$startOfPeriod, $endOfPeriod])->where('Номер', $document->Номер)->count();
        if ($duplicates > 0) {
          $document->Комментарий = 'Номер не уникальный';
          return false;
        }
      }
    }
}
