<?php

namespace App\Http\Controllers;

use App\Events\onRegisterSaving;
use App\Models\CashRegister;
use App\Models\Register;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CashRegisterController extends Controller
{
  public function index()
  {
    //
  }

  public function create()
  {
    //
  }

  public function store(Request $request)
  {
    return Register::store($request,'App\Models\CashRegister');
  }

  public function show(CashRegister $cashRegister)
  {
    //
  }

  public function edit(CashRegister $cashRegister)
  {
    //
  }

  public function update(Request $request, CashRegister $cashRegister)
  {
    //
  }

  public function destroy(CashRegister $cashRegister)
  {
    //
  }
}
