<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->boolean('isGroup')->default(false);
            $table->integer('parent_id')->nullable();
            $table->string('Наименование',100)->default("");
            $table->string('Пол',10)->default("");
            $table->string('Фамилия',50)->default("");
            $table->string('Имя',50)->default("");
            $table->string('Отчество',50)->default("");
            $table->date('ДатаРождения')->nullable();
            $table->string('Телефон',30)->default("");
            $table->string('ИНН',12)->default("");
            $table->string('СНИЛС',14)->default("");
            $table->string('МестоРождения')->default("");
            $table->integer('Налоговая')->nullable();
            $table->string('Занятость',30)->default("");
            $table->integer('МестоРаботы')->nullable();
            $table->string('Должность',50)->default("");
            $table->double('ДоходПрошлогоГода')->default(0);
            $table->string('Госуслуги',30)->default("");
            $table->boolean('СемейноеПоложение',30)->default(false);
            $table->string('Супруг',100)->default("");
            $table->integer('СРО')->nullable();
            $table->integer('АрбитражныйСуд')->nullable();
            $table->date('ДатаПодачиЗаявления')->nullable();
            $table->string('Комментарий')->default("");;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clients');
    }
}
