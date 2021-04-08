<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientBankAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_bank_accounts', function (Blueprint $table) {
          $table->id();
          $table->integer('client_id');
          $table->string('ВидСчета',15)->default("");
          $table->string('ВалютаСчета',10)->default("");
          $table->string('НомерСчета',20)->default("");
          $table->integer('Банк')->nullable();
          $table->double('Остаток')->default(0);
          $table->date('ДатаОткрытия')->nullable();
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
        Schema::dropIfExists('client_bank_accounts');
    }
}
