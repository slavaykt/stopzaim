<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientCreditorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_creditors', function (Blueprint $table) {
          $table->id();
          $table->integer('client_id');
          $table->string('СодержаниеОбязательства',30)->default("");
          $table->integer('Кредитор')->nullable();
          $table->string('ОснованиеВозникновения',100)->default("");
          $table->double('СуммаВсего')->default(0);
          $table->double('СуммаЗадолженность')->default(0);
          $table->double('ШтрафыПени')->default(0);
          $table->boolean('Наличие')->default(false);
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
        Schema::dropIfExists('client_creditors');
    }
}
