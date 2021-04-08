<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
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
      $data['Адрес'] = transform_address($data['Адрес']);
  
      return $data;
    }
}
