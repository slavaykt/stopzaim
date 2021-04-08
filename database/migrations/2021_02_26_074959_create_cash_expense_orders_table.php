<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCashExpenseOrdersTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('cash_expense_orders', function (Blueprint $table) {
      $table->id();
      $table->boolean('registered')->default(0);
      $table->dateTime('Дата')->useCurrent();
      $table->integer('Номер')->default(0);
      $table->string('ВидОперации', 30)->default("");
      $table->integer('Клиент')->nullable();
      $table->string('Выдано', 50)->default("");
      $table->double('Сумма')->default(0);
      $table->string('ОснованиеПлатежа')->default("");
      $table->string('Комментарий')->default("");
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
    Schema::dropIfExists('cash_expense_orders');
  }
}
