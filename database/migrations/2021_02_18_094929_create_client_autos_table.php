<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientAutosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_autos', function (Blueprint $table) {
          $table->id();
          $table->integer('client_id');
          $table->string('Наименование',30)->default("");
          $table->string('ВидТС',30)->default("");
          $table->string('ВидСобственности',30)->default("");
          $table->double('Стоимость')->default(0);
          $table->string('ГодВыпуска',4)->default("");
          $table->string('ИдентификационныйНомер',20)->default("");
          $table->string('СведенияОЗалоге',50)->default("");
          $table->string('Адрес')->default(""); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('client_autos');
    }
}
