<?php

namespace App\Http\Controllers;

use App\Http\Resources\CashExpenseOrderResource;
use App\Http\Resources\CashIncomeOrderResource;
use App\Http\Resources\CashOrderResource;
use App\Models\CashExpenseOrder;
use App\Models\CashIncomeOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CashOrderController extends Controller
{
  public function index()
  {
    $response = array_merge(
      CashOrderResource::collection(CashIncomeOrder::all())->toArray(CashIncomeOrder::all()),
      CashOrderResource::collection(CashExpenseOrder::all())->toArray(CashExpenseOrder::all())
    );
    // $response = array_sort($response, function ($value) {
    //   return $value['Дата'];
    // });
    return response()->json($response, 200);
  }
}
