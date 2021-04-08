<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePassportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('passports', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id');
            $table->string('Серия',10)->default("");
            $table->string('Номер',10)->default("");
            $table->string('КемВыдано',100)->default("");
            $table->date('ДатаВыдачи',4)->nullable();
            $table->string('КодПодразделения',8)->default("");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('passports');
    }
}
