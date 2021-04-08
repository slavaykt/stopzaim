<?php

namespace Database\Factories;

use App\Models\ClientTax;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientTaxFactory extends Factory
{
  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  protected $model = ClientTax::class;

  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      'НаименованиеНалогаСбора' =>  $this->faker->randomElement($array = ['налог на имущество', 'земельный налог', 'транспортный налог']),
      'Недоимка' => $this->faker->randomNumber(4),
      'ШтрафыПени' => $this->faker->randomNumber(4),
    ];
  }
}
