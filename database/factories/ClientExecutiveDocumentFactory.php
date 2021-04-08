<?php

namespace Database\Factories;

use App\Models\ClientExecutiveDocument;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientExecutiveDocumentFactory extends Factory
{
  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  protected $model =  ClientExecutiveDocument::class;

  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    $sex = $this->faker->randomElement($array = array('male', 'female'));
    $firstName = $this->faker->firstName($sex);
    $middleName = $this->faker->middleName($sex);
    $lastName = $this->faker->lastName($sex);
    return [
      'ВидДокумента' =>  $this->faker->randomElement($array = ['постановление', 'судебный приказ', 'исполнительный лист']),
      'Дата' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
      'Номер' => $this->faker->randomNumber(6),
      'Исполнитель' =>  "$lastName $firstName $middleName",
      'Содержание' => $this->faker->text(70),
    ];
  }
}
