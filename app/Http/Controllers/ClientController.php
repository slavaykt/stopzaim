<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientRequest;
use App\Models\Client;
use Illuminate\Http\Request;
use App\Http\Resources\ClientResource;
use Enumeration;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;

class ClientController extends Controller
{

  public function index()
  {
    return response(Client::orderBy('isGroup', 'desc')->orderBy('Наименование')->get(), 200);
  }

  public function store(ClientRequest $request)
  {
    try {
      if ($request->isGroup) {
        $client = new Client;
        $client->Наименование = $request->Наименование;
        $client->parent_id = $request->parent_id;
        $client->isGroup = true;
        $client->save();
        return response()->json($client, 201);
      } else {
        $client = Client::create($request->all());
        return response()->json(new ClientResource($client), 201);
      }
    } catch (\Throwable $th) {
      return response($th->getMessage(), 201);
    }
  }

  public function show(Client $client)
  {
    try {
      return response()->json(new ClientResource($client), 200);
    } catch (\Throwable $th) {
      return response($th->getMessage(), 200);
    }
  }

  public function create()
  {
    return response()->json(new ClientResource(new Client), 200);
  }

  public function update(ClientRequest $request, Client $client)
  {
    try {
      if ($request->parent_id) {
        if ($request->rowIds) {
          Client::whereIn('id', $request->rowIds)->update(['parent_id' => $request->parent_id]);
        } else {
          $client->parent_id = $request->parent_id;
          $client->save();
        }
      } else {
        $client->update($request->all());
      }
      return response()->json(new ClientResource($client), 200);
    } catch (\Throwable $th) {
      return response($th->getMessage(), 200);
    }
  }

  public function destroy($ids)
  {
    Client::destroy(explode(",", $ids));
    return response()->json(null, 204);
  }
}
