<?php

use App\Http\Controllers\ClientController;
use App\Http\Resources\ClientAttachmentSectionResourceCollection;
use App\Models\Client;
use App\Models\ClientAttachmentSection;
use App\Models\Contract;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
  return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// Route::get('/print/clients/{id}/application', function ($id) {
//   return view('print.client_application',['client' => Client::findOrFail($id)]);
// });

Route::group(['prefix' => '/print/clients/{id}'], function () {
  Route::get('application', function ($id) {
    return view('print.client_application', ['client' => Client::findOrFail($id)]);
  });
  Route::get('creditorsList', function ($id) {
    return view('print.client_creditors_list', ['client' => Client::findOrFail($id)]);
  });
  Route::get('propertyList', function ($id) {
    return view('print.client_property_list', ['client' => Client::findOrFail($id)]);
  });
});

Route::get('/print/contract/{id}', function ($id) {
  return view('print.contract', ['contract' => Contract::findOrFail($id)]);
});

Route::middleware('auth')->get('/import', [App\Http\Controllers\ImportController::class, 'show'])->name('import.show');

Route::post('/import/upload', [App\Http\Controllers\ImportController::class, 'upload'])->name('import.upload');
