<?php

namespace Database\Factories;

use App\Models\ClientChild;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientChildFactory extends Factory
{
  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  protected $model = ClientChild::class;

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
      'ФИО' => "$lastName $firstName $middleName",
      'Пол' => $sex === 'male' ? 'муж' : 'жен',
      'ДатаРождения' => $this->faker->date($format = 'Y-m-d', $max = 'now'),  
      'СвидетельствоСерия' => $this->faker->randomLetter.$this->faker->randomLetter.$this->faker->randomLetter.$this->faker->randomLetter,
      'СвидетельствоНомер' => $this->faker->randomNumber(6),
      'СвидетельствоДатаВыдачи' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
    ];
  }
}
