<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyClientsAutosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::table('client_autos', function (Blueprint $table) {
        $table->renameColumn('Адрес', 'АдресOld');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::table('client_autos', function (Blueprint $table) {
        $table->renameColumn('АдресOld', 'Адрес');
      });
    }
}
