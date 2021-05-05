<?php

namespace App\Http\Controllers;

use App\Models\Register;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
  public function store(Request $request)
  {
    return Register::store($request);
  }
}
