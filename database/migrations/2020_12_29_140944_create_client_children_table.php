<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientChildrenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_children', function (Blueprint $table) {
          $table->id();
          $table->integer('client_id');
          $table->string('ФИО',100)->default("");
          $table->string('Пол',10)->default("");
          $table->date('ДатаРождения')->nullable();
          $table->string('СвидетельствоСерия',10)->default("");
          $table->string('СвидетельствоНомер',10)->default("");
          $table->date('СвидетельствоДатаВыдачи')->nullable();
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
        Schema::dropIfExists('client_children');
    }
}
