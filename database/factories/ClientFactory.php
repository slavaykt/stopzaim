<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\ClientChild;
use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Client::class;


    /**
     * Define the model's default state.
     *
     * @return array
     */

    // public function configure()
    // {
    //     return $this->afterCreating(function (Client $client) {
    //       $client->hasMany(ClientChild::factory()->count(3));
    //     });
    // }

    public function definition()
    {
        $sex = $this->faker->randomElement($array = array('male', 'female'));
        $firstName = $this->faker->firstName($sex);
        $middleName = $this->faker->middleName($sex);
        $lastName = $this->faker->lastName($sex);
        $companies = [];
        foreach (Company::all() as $value) {
            $companies[] = $value;
        }
        return [
            'Наименование' => "$lastName $firstName $middleName",
            'Фамилия' => $lastName,
            'Имя' => $firstName,
            'Отчество' => $middleName,
            'Пол' => $sex === 'male' ? 'муж' : 'жен',
            'ДатаРождения' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
            'Телефон' => $this->faker->phoneNumber,
            'ИНН' => $this->faker->randomNumber(6).$this->faker->randomNumber(6),
            'СНИЛС' => $this->faker->randomNumber(3).'-'.$this->faker->randomNumber(3).'-'.$this->faker->randomNumber(3).' '.$this->faker->randomNumber(2),
            'МестоРождения' => $this->faker->city,
            'Налоговая' => $companies[array_rand($companies)]->id,
            'Занятость' => $this->faker->randomElement($array = ['Работает','Безработный','Пенсионер','Работающий пенсионер']),
            'МестоРаботы' => $companies[array_rand($companies)]->id,
            'Должность' =>  $this->faker->jobTitle,
            'ДоходПрошлогоГода' => $this->faker->randomFloat(2),
            'Госуслуги' =>  $this->faker->word,
            'СРО' => $companies[array_rand($companies)]->id,
            'АрбитражныйСуд' => $companies[array_rand($companies)]->id,
            'ДатаПодачиЗаявления' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
            'Комментарий' =>  $this->faker->text(100),
            'created_at' => $this->faker->dateTime(),
            'updated_at' => $this->faker->dateTime()
        ];
    }
}
