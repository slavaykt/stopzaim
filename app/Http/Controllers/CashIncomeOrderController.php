<?php

namespace App\Http\Controllers;

use App\Http\Requests\CashIncomeOrderRequest;
use App\Http\Resources\CashIncomeOrderResource;
use App\Models\CashIncomeOrder;
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

  public function store(CashIncomeOrderRequest $request)
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

  public function update(CashIncomeOrderRequest $request, CashIncomeOrder $cashIncomeOrder)
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

    logger('deleting..');
    logger($ids);
    try {
      CashIncomeOrder::destroy(explode(",", $ids));
    } catch (\Throwable $th) {
      logger($th->getMessage());
    };
    return response()->json(null, 204);
  }
}
