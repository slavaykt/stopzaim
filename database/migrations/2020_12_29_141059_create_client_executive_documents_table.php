<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientExecutiveDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_executive_documents', function (Blueprint $table) {
          $table->id();
          $table->integer('client_id');
          $table->string('ВидДокумента',50)->default("");
          $table->date('Дата')->nullable();
          $table->string('Номер',20)->default("");
          $table->string('Исполнитель',100)->default("");
          $table->string('Содержание')->default("");
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
        Schema::dropIfExists('client_executive_documents');
    }
}
