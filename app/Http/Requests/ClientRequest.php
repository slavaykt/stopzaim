<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;

class ClientRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      //
    ];
  }

  public function all($keys = null)
  {
    $data = parent::all($keys);
    if (array_key_exists('parent_id', $data) || array_key_exists('isGroup', $data)) return $data;
    // foreach (['Налоговая', 'МестоРаботы', 'СРО', 'АрбитражныйСуд'] as $rel) {
    //   if ($data[$rel]) {
    //     $data[$rel] = $data[$rel]['id'];
    //   }
    // }
    $data['Адрес'] = transform_address($data['Адрес']);

    return $data;
  }
}
