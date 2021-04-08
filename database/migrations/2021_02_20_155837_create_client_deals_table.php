<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientDealsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_deals', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id');
            $table->morphs('dealable');
            $table->date('Дата')->useCurrent();
            $table->string('ВидСделки',30)->default("");
            $table->double('Сумма')->default(0);; 
            $table->string('Основание')->default(""); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('client_deals');
    }
}
