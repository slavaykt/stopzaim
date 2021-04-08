<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class CreateTestTable extends Migration
{
  protected $columns;

  public function up()
  {
    $this->columns = Config::get('tables.test');
    if (Schema::hasTable('test')) {
      Schema::table('test', function (Blueprint $table) {
        $prevColumn = 'id';
        foreach ($this->columns as $column) {
          ['type' => $type, 'name' => $name] = $column;
          if (!Schema::hasColumn('test', $name)) {
            if (isset($column['prevName'])) {
              if (Schema::hasColumn('test', $column['prevName'])) {
                $table->renameColumn($column['prevName'], $name);
              }
            } else {
              $table->$type($name)->after($prevColumn);
            }
          }
          $prevColumn = $name;
        }
      });
    } else {
      Schema::create('test', function (Blueprint $table) {
        $table->id();
        foreach ($this->columns as $column) {
          ['type' => $type, 'name' => $name] = $column;
          $table->$type($name);
        }
        $table->timestamps();
      });
    }
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    // Schema::dropIfExists('test');
  }
}
