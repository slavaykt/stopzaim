<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Models\Company;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\TryCatch;

class CompanyController extends Controller
{
  public function index()
  {
    return response(Company::orderBy('isGroup', 'desc')->orderBy('Наименование')->get(), 200);
  }

  public function create()
  {
    return response()->json(new CompanyResource(new Company()), 200);
  }

  public function store(CompanyRequest $request)
  {
    try {
      if ($request->isGroup) {
        $company = new Company;
        $company->Наименование = $request->Наименование;
        $company->parent_id = $request->parent_id;
        $company->isGroup = true;
        $company->save();
        return response()->json($company, 201);
      } else {
        $company = Company::create($request->all());
        return response()->json(new CompanyResource($company), 201);
      }
    } catch (\Throwable $th) {
      return response($th->getMessage(), 201);
    }
  }

  public function show(Company $company)
  {
    try {
      return response()->json(new CompanyResource($company), 200);
    } catch (\Throwable $th) {
      return response($th->getMessage(), 200);
    }
  }

  public function update(CompanyRequest $request, Company $company)
  {
    try {
      if ($request->parent_id) {
        if ($request->rowIds) {
          Company::whereIn('id', $request->rowIds)->update(['parent_id' => $request->parent_id]);
        } else {
          $company->parent_id = $request->parent_id;
          $company->save();
        }
      } else {
        $company->update($request->all());
      }
      return response()->json(new CompanyResource($company), 200);
    } catch (\Throwable $th) {
      return response($th->getMessage(), 200);
    }
  }

  public function destroy($ids)
  {
    $idsArr = explode(",", $ids);
    $errors = [];
    foreach ($idsArr as $id) {
      $company = Company::find($id);
      if (isset($company)) {
        if (count($company->links) > 0) {
          $errors = array_merge($errors, $company->links);
        } else {
          Company::destroy($id);
        }
      }
    }
    return response()->json($errors, 200);
  }
}
