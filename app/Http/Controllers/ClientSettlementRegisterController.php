<?php

namespace App\Http\Controllers;

use App\Events\onRegisterSaving;
use App\Http\Resources\ClientSettlementRegisterResource;
use App\Models\Client;
use App\Models\ClientSettlementRegister;
use App\Models\Register;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

class ClientSettlementRegisterController extends Controller
{
  public function index()
  {
    return response(ClientSettlementRegisterResource::collection(ClientSettlementRegister::all()), 200);
  }

  public function create()
  {
    //
  }

  public function fetch($id, $date1, $date2)
  {
    try {
      if ($id) {
        $fetch = ClientSettlementRegister::whereBetween('Дата', [$date1, $date2])->orderBy('Дата','asc')->where('Клиент', $id)->get();
      } else {
        $fetch = ClientSettlementRegister::whereBetween('Дата', [$date1, $date2])->orderBy('Дата','asc')->get();
      }
      $grouped = [];
      foreach ($fetch->groupBy('Клиент') as $key => $value) {
        $grouped[] = ['Клиент' => Client::find($key), 'children' => ClientSettlementRegisterResource::collection($value)];
      }
      return response($grouped, 200);
    } catch (\Throwable $th) {
      logger($th->getMessage());
    }
  }

  public function store(Request $request)
  {
    return Register::store($request, 'App\Models\ClientSettlementRegister');
  }

  public function show(ClientSettlement $clientSettlement)
  {
    //
  }

  public function edit(ClientSettlement $clientSettlement)
  {
    //
  }

  public function update(Request $request, ClientSettlement $clientSettlement)
  {
    //
  }

  public function destroy(ClientSettlement $clientSettlement)
  {
    //
  }
}
