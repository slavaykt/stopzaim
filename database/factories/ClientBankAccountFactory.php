<?php

namespace Database\Factories;

use App\Models\ClientBankAccount;
use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientBankAccountFactory extends Factory
{
  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  protected $model = ClientBankAccount::class;

  /**
   * Define the model's default state.
   *
   * @return array
   */

  public function definition()
  {
    $companies = [];
    foreach (Company::all() as $value) {
      $companies[] = $value;
    };
    return [
      'ВидСчета' =>  $this->faker->randomElement($array = ['текущий', 'вклад']),
      'ВалютаСчета' => 'руб.',
      'НомерСчета' => $this->faker->randomNumber(6) . $this->faker->randomNumber(6) . $this->faker->randomNumber(6) . $this->faker->randomNumber(2),
      'Банк' => $companies[array_rand($companies)]->id,
      'Остаток' => $this->faker->randomNumber(5),
      'ВыпискаДатаНачала' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
      'ВыпискаДатаОкончания' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
      'ДатаОткрытия' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
    ];
  }
}
