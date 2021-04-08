<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientRealtiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_realties', function (Blueprint $table) {
          $table->id();
          $table->integer('client_id');
          $table->string('Наименование',100)->default("");
          $table->string('ВидИмущества',30)->default("");
          $table->string('ВидСобственности',30)->default("");
          $table->double('Площадь')->default(0);
          $table->string('ОснованиеПриобретения')->default("");
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
        Schema::dropIfExists('client_realties');
    }
}
