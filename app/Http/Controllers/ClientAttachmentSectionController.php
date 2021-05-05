<?php

namespace App\Http\Controllers;

use App\Models\ClientAttachmentSection;
use Illuminate\Http\Request;
use App\Http\Resources\ClientAttachmentSectionResourceCollection;

class ClientAttachmentSectionController extends Controller
{

  public function index()
  {
    try {
      //return response(ClientAttachmentSection::all(), 200);
      return response(new ClientAttachmentSectionResourceCollection(ClientAttachmentSection::all()), 200);
    } catch (\Throwable $th) {
      return response($th->getMessage(), 200);
    }
  }

  public function create()
  {
    //
  }

  public function store(Request $request)
  {
    try {
      foreach ($request->data as $item) {
        if (array_key_exists('delete', $item)) {
          ClientAttachmentSection::destroy($item['id']);
        } else {
          $id = $item['id'];
          unset($item['id']);
          ClientAttachmentSection::updateOrCreate(['id' => $id], $item);
        }
      }
      return response()->json(ClientAttachmentSection::all(), 201);
    } catch (\Throwable $th) {
      return response($th->getMessage(), 201);
    }
  }

  public function show(ClientAttachmentSection $clientAttachmentSection)
  {
    //
  }

  public function edit(ClientAttachmentSection $clientAttachmentSection)
  {
    //
  }

  public function update(Request $request, ClientAttachmentSection $clientAttachmentSection)
  {
    //
  }

  public function destroy(ClientAttachmentSection $clientAttachmentSection)
  {
    //
  }
}
