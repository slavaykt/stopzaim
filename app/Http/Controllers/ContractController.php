<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContractRequest;
use App\Http\Resources\ContractResource;
use App\Models\Contract;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContractController extends Controller
{
    public function index()
    {
      return response(ContractResource::collection(Contract::orderBy('Дата','asc')->get()), 200);
    }

    public function create()
    {
      return response()->json(new ContractResource(new Contract), 200);
    }

     public function store(ContractRequest $request)
    {
      try {
        $contract = Contract::create($request->all());
        return response()->json(new ContractResource($contract), 201);
      } catch (\Throwable $th) {
        return response($th->getMessage(), 201);
      }
    }

    public function show(Contract $contract)
    {
      try {
        return response()->json(new ContractResource($contract), 200);
      } catch (\Throwable $th) {
        return response($th->getMessage(), 200);
      }
    }

    public function edit(Contract $contract)
    {
        //
    }

    public function update(ContractRequest $request, Contract $contract)
    {
      try {
        $contract->update($request->all());
        return response()->json(new ContractResource($contract), 200);
      } catch (\Throwable $th) {
        return response($th->getMessage(), 200);
      }
    }

    public function destroy(Contract $contract)
    {
        //
    }
}
