<?php

use App\Http\Controllers\CashExpenseOrderController;
use App\Http\Controllers\CashIncomeOrderController;
use App\Http\Controllers\CashOrderController;
use App\Http\Controllers\CashRegisterController;
use App\Http\Controllers\ClientAttachmentSectionController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ClientSettlementRegisterController;
use App\Http\Controllers\CollectingManagementController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\RegisterController;
use App\Models\ClientSettlementRegister;
use App\Models\Register;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
  return $request->user();
});

Route::get('client_settlement_register/fetch/{id}/{date1}/{date2}',[ClientSettlementRegisterController::class,'fetch']);

Route::resources([
  'clients' => ClientController::class,
  'companies' => CompanyController::class,
  'cash_register' => CashRegisterController::class,
  'client_settlement_register' => ClientSettlementRegisterController::class,
  'attachment/sections' => ClientAttachmentSectionController::class,
  'contracts' => ContractController::class,
]);

Route::resource('cash/orders/income', CashIncomeOrderController::class)->parameters([
  'income' => 'cash_income_order'
]);

Route::get('cash/orders/income/dateTime/{date}', [CashIncomeOrerController::class, 'dateTime']);

Route::resource('cash/orders/expense', CashExpenseOrderController::class)->parameters([
  'expense' => 'cash_expense_order'
]);

Route::resource('collectingManagement', CollectingManagementController::class)->only(['index','store']);

Route::get('cash', [CashOrderController::class, 'index']);

Route::post('register', [RegisterController::class, 'store']);

Route::get('config', function () {
  $config =  [
    'autoTypes' => Config::get('enumerations.auto.types'),
    'bankAccountTypes' => Config::get('enumerations.bank.account.types'),
    'currencies' => Config::get('enumerations.currencies'),
    'dealTypes' => Config::get('enumerations.deal.types'),
    'employment' => Config::get('enumerations.employment'),
    'executiveDocumentTypes' => Config::get('enumerations.executive.document.types'),
    'liabilityTypes' => Config::get('enumerations.liability.types'),
    'ownshipTypes' => Config::get('enumerations.ownship.types'),
    'realtyTypes' => Config::get('enumerations.realty.types'),
    'sexes' => Config::get('enumerations.sexes'),
    'taxes' => Config::get('enumerations.taxes'),
    'cashIncomeTypes' => Config::get('enumerations.cash.income.types'),
    'cashExpenseTypes' => Config::get('enumerations.cash.expense.types'),
    'defaultAttachmentSections' => Config::get('enumerations.attachment.sections'),
    'stages' => Config::get('enumerations.stages'),
  ];
  return response()->json($config, 200);
});
