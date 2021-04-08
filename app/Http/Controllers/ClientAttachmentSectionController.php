<?php

namespace App\Http\Controllers;

use App\Models\ClientAttachmentSection;
use Illuminate\Http\Request;
use App\Http\Resources\ClientAttachmentSectionResourceCollection;

class ClientAttachmentSectionController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    try {
      return response(new ClientAttachmentSectionResourceCollection(ClientAttachmentSection::all()), 200);
    } catch (\Throwable $th) {
      return response($th->getMessage(), 200);
    }
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
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

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\ClientAttachmentSection  $clientAttachmentSection
   * @return \Illuminate\Http\Response
   */
  public function show(ClientAttachmentSection $clientAttachmentSection)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\ClientAttachmentSection  $clientAttachmentSection
   * @return \Illuminate\Http\Response
   */
  public function edit(ClientAttachmentSection $clientAttachmentSection)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\ClientAttachmentSection  $clientAttachmentSection
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, ClientAttachmentSection $clientAttachmentSection)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\ClientAttachmentSection  $clientAttachmentSection
   * @return \Illuminate\Http\Response
   */
  public function destroy(ClientAttachmentSection $clientAttachmentSection)
  {
    //
  }
}
