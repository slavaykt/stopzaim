<?php

namespace App\Http\Controllers;

use App\Http\Resources\CashIncomeOrderResource;
use App\Models\CashExpenseOrder;
use App\Models\CashIncomeOrder;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CashIncomeOrderController extends Controller
{
  public function index()
  {
    return response(CashIncomeOrderResource::collection(CashIncomeOrder::orderBy('Дата', 'asc')->get()), 200);
  }

  public function create()
  {
    $response = new CashIncomeOrderResource(new CashIncomeOrder);
    return response()->json($response, 200);
  }

  public function store(Request $request)
  {
    try {
      $cashIncomeOrder = CashIncomeOrder::create($request->all());
      return response()->json(new CashIncomeOrderResource($cashIncomeOrder), 201);
    } catch (\Throwable $th) {
      return response($th->getMessage(), 201);
    }
  }

  public function show(CashIncomeOrder $cashIncomeOrder)
  {
    try {
      return response()->json(new CashIncomeOrderResource($cashIncomeOrder), 200);
    } catch (\Throwable $th) {
      return response($th->getMessage(), 200);
    }
  }

  public function edit(Request $request, CashIncomeOrder $cashIncomeOrder)
  {
    try {
      return response()->json(new CashIncomeOrderResource($cashIncomeOrder), 200);
    } catch (\Throwable $th) {
      return response($th->getMessage(), 200);
    }
  }

  public function update(Request $request, CashIncomeOrder $cashIncomeOrder)
  {
    try {
      $cashIncomeOrder->update($request->all());
      return response()->json(new CashIncomeOrderResource($cashIncomeOrder), 200);
    } catch (\Throwable $th) {
      return response($th->getMessage(), 200);
    }
  }

  public function destroy($ids)
  {
    try {
      CashIncomeOrder::destroy(explode(",", $ids));
    } catch (\Throwable $th) {
      logger($th->getMessage());
    };
    return response()->json(null, 204);
  }

  public function dateTime($dateString)
  {
    if (Carbon::now()->format('Y-m-d') === Carbon::parse($dateString)->format('Y-m-d')) {
      return response()->json(Carbon::now()->format('Y-m-d\TH:i'), 200);
    }
    $date = strtotime($dateString);
    $from = date('Y-m-d 00:00:00', $date);
    $to = date('Y-m-d 23:59:59', $date);
    $latestIncome = CashIncomeOrder::whereBetween('Дата', [$from, $to])->orderBy('Дата', 'desc')->first();
    $latestExpense = CashExpenseOrder::whereBetween('Дата', [$from, $to])->orderBy('Дата', 'desc')->first();
    $latestIncomeTime = isset($latestIncome) ? strtotime($latestIncome['Дата']) : 0;
    $latestExpenseTime = isset($latestExpense) ? strtotime($latestExpense['Дата']) : 0;
    $latestTime = max($latestIncomeTime, $latestExpenseTime);
    if ($latestTime>0) {
      $latestTime += 60;
      $latestDate = date('Y-m-d H:i:s', $latestTime);
      return response()->json(Carbon::parse($latestDate)->format('Y-m-d\TH:i'), 200);
    } else {
      return response()->json(null, 201);
    }
  }
}
