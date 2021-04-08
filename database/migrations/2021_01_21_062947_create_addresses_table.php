<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->morphs('registerable');
            $table->string('Индекс')->default("");
            $table->string('Регион')->default("");
            $table->string('Район')->default("");
            $table->string('Город')->default("");
            $table->string('НаселенныйПункт')->default("");
            $table->string('Улица')->default("");
            $table->string('Дом')->default("");
            $table->string('Корпус')->default("");
            $table->string('Квартира')->default("");
            $table->string('РегионПоиск')->default("");
            $table->string('РайонПоиск')->default("");
            $table->string('ГородПоиск')->default("");
            $table->string('НаселенныйПунктПоиск')->default("");
            $table->string('УлицаПоиск')->default("");
            $table->string('ДомПоиск')->default("");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('addresses');
    }
}
