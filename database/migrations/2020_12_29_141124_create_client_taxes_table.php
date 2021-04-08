<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientTaxesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_taxes', function (Blueprint $table) {
          $table->id();
          $table->integer('client_id');
          $table->string('НаименованиеНалогаСбора',100)->default("");
          $table->double('Недоимка')->default(0);
          $table->double('ШтрафыПени')->default(0);
          $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('client_taxes');
    }
}
