<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientSettlementRegistersTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('client_settlement_regs', function (Blueprint $table) {
      $table->id();
      $table->boolean('registered')->default(0);
      $table->dateTime('Дата');
      $table->morphs('registerable');
      $table->integer('Клиент');
      $table->double('СуммаПриход')->default(0);
      $table->double('СуммаРасход')->default(0);
      $table->double('СуммаОстаток')->default(0);
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
    Schema::dropIfExists('client_settlement_regs');
  }
}
