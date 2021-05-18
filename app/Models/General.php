<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class General extends Model
{
  use HasFactory;

  private function dateFormat($dateString)
  {
    return date("d.m.Y", strtotime($dateString));
  }

  private function is_Date($str)
  {
    return is_numeric(strtotime($str));
  }

  public function printValue($path)
  {
    $slugs = explode(".", $path);
    $val = $this;
    $prop = "";
    foreach ($slugs as $slug) {
      $val = $val->$slug;
      $prop = $prop . '.' . $slug;
      if (empty($val)) {
        return "<span class='error'>$prop отсутствует</span>";
      }
    }
    if ($this->is_Date($val)) {
      return $this->dateFormat($val);
    } else {
      return $val;
    }
  }

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
          if (!isset($request[$name])) continue;
          $idsToDelete = array_diff(array_pluck($model->$collection->toArray(), 'id'), array_pluck($request[$name], 'id'));
          $model->$collection()->whereIn('id', $idsToDelete)->delete();
          foreach ($request[$name] as $item) {
            try {
              $row = $model->$collection()->firstOrNew(['id' =>  $item['id']]);
              foreach ($row->getAttributes() as $key => $value) {
                if (isset($item[$key]) && $key !== 'id') {
                  $row->$key = $item[$key];
                }
              }
              //$row->fill($item);
              $row->save();
              if (isset($item['Адрес'])) {
                $transformed_address = transform_address($item['Адрес']);
                $row->address()->updateOrCreate(array_only($transformed_address, ['id']), array_except($transformed_address, ['id']));
              }
              if ($name === 'Сделки' && isset($item['Имущество'])) {
                $arr = explode("|", $item['Имущество']);
                $d_type = null;
                $d_id = null;
                foreach ($arr as $value) {
                  [$k, $v] = explode(":", $value);
                  if ($k === 'dealable_type') {
                    $d_type = $v;
                  } else if ($k === 'dealable_id') {
                    $d_id = $v;
                  }
                }
                if (isset($d_type) && isset($d_id)) {
                  $dealable = $d_type::find($d_id);
                  $row->dealable()->associate($dealable);
                  $row->save();
                }
              }
            } catch (\Throwable $th) {
              logger($th->getMessage());
            }
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
