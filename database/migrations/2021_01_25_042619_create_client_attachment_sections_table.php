<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientAttachmentSectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_attachment_sections', function (Blueprint $table) {
            $table->id();
            $table->string('Наименование',100)->default("");
            $table->text('ТекстДляПечати',1000);
            $table->string('ТекстПриложения')->default("");
            $table->string('ТекстОтсутствиеПриложения')->default("");
            $table->integer('Порядок');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('client_attachment_sections');
    }
}
