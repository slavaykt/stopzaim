<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class General extends Model
{
  use HasFactory;

  protected static function boot()
  {
    parent::boot();

    static::saved(function ($model) {
      $request = request();
      DB::transaction(function () use ($request, $model) {
        if ($request['Адрес']) {
          $transformed_address = transform_address($request['Адрес']);
          $model->address()->updateOrCreate(array_only($transformed_address, ['id']), array_except($transformed_address, ['id'])); 
        }
        if ($request['Паспорт']) {
          $model->passport()->updateOrCreate(array_only($request['Паспорт'], ['id']), array_except($request['Паспорт'], ['id']));
        }
        if (!isset($model->collections)) return;
        foreach ($model->collections as $name => $collection) {
          if (!isset($request[$name])) return;
          $idsToDelete = array_diff(array_pluck($model->$collection->toArray(), 'id'), array_pluck($request[$name], 'id'));
          foreach ($idsToDelete as $id) {
            $model->$collection()->where('id', $id)->delete();
          }
          foreach ($request[$name] as $item) {
            $payload = [];
            foreach ($item as $key => $val) {
              if (isset($val['id'])) {
                $payload[$key] = $val['id'];
                continue;
              }
              preg_match_all('/^.+?:.+?(?=\|)|(?<=\|).+?:.+(?=\|)|(?<=\|).+?$/', $val, $matches);
              if (count($matches[0]) > 0) {
                foreach ($matches[0] as $match) {
                  [$k, $v] = explode(":", $match);
                  $payload[$k] = $v;
                }
                continue;
              }
              $payload[$key] = $val;
            }
            $model->$collection()->updateOrCreate(array_only($payload, ['id']), array_except($payload, ['id']));
          }
        }
      });
    });

    static::deleted(function ($model) {
      if (!isset($model->collections)) return;
      foreach ($model->collections as $collection) {
        $model->$collection()->delete();
      }
    });
  }
}
