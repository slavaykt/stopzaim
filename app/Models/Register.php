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

  public static function store($request)
  {
    try {
      foreach ($request->data as $doc) {
        foreach ($doc as $reg) {
          $model = $reg['registerName'];
          $data = $model::where([['registerable_type', $reg['registerable_type']], ['registerable_id', $reg['registerable_id']]])->get()->toArray();
          $model::where([['registerable_type', $reg['registerable_type']], ['registerable_id', $reg['registerable_id']]])->delete();
          if ($request->method === 'updateOrCreate') {
            foreach ($reg['data'] as &$row) {
              $row['registerable_type'] = $reg['registerable_type'];
              $row['registerable_id'] = $reg['registerable_id'];
              $model::create($row);
              $data[] = $row;
            }
          }
          event(new onRegisterSaving($reg['startDate'], $model, $data));
          $docModel = $reg['registerable_type'];
          $registrator = $docModel::find($reg['registerable_id']);
          if (!empty($registrator)) {
            $registrator->registered = $request->method === 'updateOrCreate' ? 1 : 0;
            $registrator->save();
          }
        }
      }
      return response()->json('success!', 201);
    } catch (\Throwable $th) {
      logger($th->getMessage());
      return response($th->getMessage(), 400);
    }
  }

}
