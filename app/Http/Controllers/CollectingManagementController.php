<?php

namespace App\Http\Controllers;

use App\Http\Resources\CollectingManagementResource;
use App\Models\ClientAttachment;
use App\Models\ClientAttachmentSection;
use App\Models\ClientCreditor;
use Illuminate\Http\Request;

class CollectingManagementController extends Controller
{
  public function index()
  {
    $response = array_merge(
      CollectingManagementResource::collection(
        ClientCreditor::whereHas('client', function ($query) {
          $query->where('Этап', '=', 'подготовка документов');
        })->get()
      )->toArray(null),
      CollectingManagementResource::collection(
        ClientAttachment::whereHas('section', function ($query) {
          $query->where('КонтролироватьСбор', '=', 1);
        })->whereHas('client', function ($query) {
          $query->where('Этап', '=', 'подготовка документов');
        })->get()
      )->toArray(null),
    );
    return response($response, 200);
  }

  public function store(Request $request)
  {
    foreach ($request->all() as $client) {
      foreach ($client['children'] as $doc) {
        if (!array_get($doc, 'modified', false)) {
          continue;
        }
        if ($doc['Тип'] === 'Справка о задолженности') {
          $creditor = ClientCreditor::find($doc['id']);
          $creditor->Наличие = $doc['Наличие'];
          $creditor->save();
        } else {
          $attachment = ClientAttachment::find($doc['id']);
          $attachment->Наличие = $doc['Наличие'];
          $attachment->save();
        }
      };
    };
    return response()->json("success", 200);
  }
}
