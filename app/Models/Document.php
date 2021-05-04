<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Document extends General
{
  use HasFactory;

  protected static function boot()
  {
    parent::boot();

    static::creating(function ($document) {
      $startOfPeriod = Carbon::createFromTimeString($document->Дата)->startOfYear()->toDateTimeString();
      $endOfPeriod = Carbon::createFromTimeString($document->Дата)->endOfYear()->toDateTimeString();
      logger($document->Номер);
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
    });

    static::updating(function ($document) {
      if ($document->Номер) {
        $startOfPeriod = Carbon::createFromTimeString($document->Дата)->startOfYear()->toDateTimeString();
        $endOfPeriod = Carbon::createFromTimeString($document->Дата)->endOfYear()->toDateTimeString();
        $duplicates = get_class($document)::whereBetween('Дата', [$startOfPeriod, $endOfPeriod])->where('Номер', $document->Номер)->where('id', '<>', $document->id)->count();
        if ($duplicates > 0) {
          $document->Комментарий = 'Номер не уникальный';
          return false;
        }
      }
    });

  }
}
