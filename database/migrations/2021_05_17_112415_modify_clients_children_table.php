<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyClientsChildrenTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table('client_children', function (Blueprint $table) {
      $table->dropColumn('СвидетельствоСерия');
      $table->dropColumn('СвидетельствоНомер');
      $table->dropColumn('СвидетельствоДатаВыдачи');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table('client_children', function (Blueprint $table) {
      $table->string('СвидетельствоСерия', 10)->default("");
      $table->string('СвидетельствоНомер', 10)->default("");
      $table->date('СвидетельствоДатаВыдачи')->nullable();
    });
  }
}
