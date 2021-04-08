<?php

namespace App\Models;

use App\Events\onRegisterSaving;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Register extends Model
{
  use HasFactory;

  public function registerable()
  {
    return $this->morphTo();
  }

  public static function store($request, $model)
  {
    try {
      $data = $model::where([['registerable_type', $request->registerable_type], ['registerable_id', $request->registerable_id]])->get()->toArray();
      if ($request->method === 'updateOrCreate') {     
        try {
          $model::where([['registerable_type', $request->registerable_type], ['registerable_id', $request->registerable_id]])->delete();
          foreach ($request->data as $row) {
            $model::create($row);
          }
          $data = array_merge($data,$request->data);
          event(new onRegisterSaving($request->startDate, $model, $data));
        } catch (\Throwable $th) {
          logger($th->getMessage());
        }
      } else if ($request->method === 'delete') {
        logger($model);
        try {
          $model::where([['registerable_type', $request->registerable_type], ['registerable_id', $request->registerable_id]])->delete();
          event(new onRegisterSaving($request->startDate, $model, $data));
        } catch (\Throwable $th) {
          logger($th->getMessage());
        }
      }
      return response()->json('success!', 201);
    } catch (\Throwable $th) {
      return response($th->getMessage(), 201);
    }
  }

  // public function isLatest()
  // {
  //   return get_class($this)::where('Дата', '>', $this->Дата)->count() > 0 ? false : true;
  // }

  // protected static function boot()
  // {
  //   parent::boot();

  //   function recount_remains($reg)
  //   {
  //     if (!$reg->isLatest()) {
  //       $current_remain = $reg->Остаток;
  //       foreach (get_class($reg)::where('Дата', '>', $reg->Дата)->orderBy('Дата', 'asc')->get() as $record) {
  //         $current_remain = $current_remain + $record->Приход - $record->Расход;
  //         $record->Остаток = $current_remain;
  //         $record->save();
  //       }
  //     }
  //   }

  //   static::saving(function ($reg) {
  //     $remain_before = CashRegister::where('Дата', '<', $reg->Дата)->sum('Приход') - CashRegister::where('Дата', '<', $reg->Дата)->sum('Расход');
  //     $reg->Остаток = $remain_before + $reg->Приход - $reg->Расход;
  //   });

  //   static::saved(function ($reg) {
  //     recount_remains($reg);
  //   });

  //   static::deleted(function ($reg) {
  //     recount_remains($reg);
  //   });
  // }
}
