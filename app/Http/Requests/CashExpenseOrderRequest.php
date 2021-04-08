<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CashExpenseOrderRequest extends FormRequest
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
      foreach (['Клиент'] as $rel) {
        if ($data[$rel]) {
          $data[$rel] = $data[$rel]['id'];
        }
      }
  
      return $data;
    }
}
