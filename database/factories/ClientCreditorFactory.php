<?php

namespace Database\Factories;

use App\Models\ClientCreditor;
use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientCreditorFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ClientCreditor::class;

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
        'СодержаниеОбязательства' =>  $this->faker->randomElement($array = ['кредит', 'заем','кредитная карта']),
        'Кредитор' => $companies[array_rand($companies)]->id,
        'ОснованиеВозникновения' => 'договор №'.$this->faker->randomNumber(3).' от '.$this->faker->date($format = 'Y-m-d', $max = 'now'),
        'СуммаВсего' => $this->faker->randomNumber(6),
        'СуммаЗадолженность' => $this->faker->randomNumber(6),
        'ШтрафыПени' => $this->faker->randomNumber(6),
      ];
    }
}
