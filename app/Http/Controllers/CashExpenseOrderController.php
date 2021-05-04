<?php

namespace App\Http\Controllers;

use App\Http\Requests\CashExpenseOrderRequest;
use App\Http\Resources\CashExpenseOrderResource;
use App\Models\CashExpenseOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CashExpenseOrderController extends Controller
{
    public function index()
    {
      return response(CashExpenseOrderResource::collection(CashExpenseOrder::orderBy('Дата','asc')->get()), 200);
    }

    public function create()
    {
      $response = new CashExpenseOrderResource(new CashExpenseOrder);
      return response()->json($response, 200);
    }

    public function store(CashExpenseOrderRequest $request)
    {
      try {
        $cashExpenseOrder = CashExpenseOrder::create($request->all());      
        return response()->json(new CashExpenseOrderResource($cashExpenseOrder), 201);
      } catch (\Throwable $th) {
        return response($th->getMessage(), 201);
      }
    }

    public function show(CashExpenseOrder $cashExpenseOrder)
    {
      try {
        return response()->json(new CashExpenseOrderResource($cashExpenseOrder), 200);
      } catch (\Throwable $th) {
        return response($th->getMessage(), 200);
      }
    }

    public function edit(Request $request, CashExpenseOrder $cashExpenseOrder)
    {
      try {
        return response()->json(new CashExpenseOrderResource($cashExpenseOrder), 200);
      } catch (\Throwable $th) {
        return response($th->getMessage(), 200);
      }
    }

    public function update(CashExpenseOrderRequest $request, CashExpenseOrder $cashExpenseOrder)
    {
      try {
        $cashExpenseOrder->update($request->all());
        return response()->json(new CashExpenseOrderResource($cashExpenseOrder), 200);
      } catch (\Throwable $th) {
        return response($th->getMessage(), 200);
      }
    }

    public function destroy($ids)
    {
      CashExpenseOrder::destroy(explode(",", $ids));
      return response()->json(null, 204);
    }
}
