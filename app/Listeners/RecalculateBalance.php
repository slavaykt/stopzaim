<?php

namespace App\Listeners;

use App\Events\onRegisterSaving;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class RecalculateBalance
{
  public function __construct()
  {
    //
  }

  private function getDimensionSets($dimensions, $data)
  {
    $result = array_unique(
      array_map(
        function ($row) use ($dimensions) {
          return array_only($row, $dimensions);
        },
        $data
      ),
      SORT_REGULAR
    );
    $result = array_map(
      function ($row) {
        $set = [];
        foreach ($row as $key => $value) {
          $set[] = [$key, $value];
        }
        return $set;
      },
      $result
    );
    return $result;
  }

  public function handle(onRegisterSaving $event)
  {
    $dimensionSets = $this->getDimensionSets($event->model::$dimensions, $event->data);
    foreach ($dimensionSets as $set) {
      try {
        $previousReg = $event->model::where('Дата', '<', $event->startDate)->where($set)->orderBy('Дата', 'desc')->first();
        if ($previousReg) {
          $balance = $previousReg->СуммаОстаток;
        } else {
          $balance = 0;
        }
        $fetch = $event->model::where('Дата', '>=', $event->startDate)->where($set)->orderBy('Дата', 'asc')->get();
        foreach ($fetch as $reg) {
          $balance = $balance + $reg->СуммаПриход - $reg->СуммаРасход;
          $reg->СуммаОстаток = $balance;
          $reg->save();
        }
      } catch (\Throwable $th) {
        logger($th->getMessage());
      }

    }
  }
}

      // $testArray = [
      //   ['Склад' => 'Центральный', 'Товар' => 'Шампунь', 'Количество' => 10],
      //   ['Склад' => 'Коммерческий', 'Товар' => 'Шампунь', 'Количество' => 5],
      //   ['Склад' => 'Коммерческий', 'Товар' => 'Мыло', 'Количество' => 15],
      //   ['Склад' => 'Центральный', 'Товар' => 'Зубная паста', 'Количество' => 3],
      //   ['Склад' => 'Коммерческий', 'Товар' => 'Шампунь', 'Количество' => 12],
      //   ['Склад' => 'Коммерческий', 'Товар' => 'Зубная паста', 'Количество' => 7],
      //   ['Склад' => 'Центральный', 'Товар' => 'Мыло', 'Количество' => 4],
      //   ['Склад' => 'Центральный', 'Товар' => 'Мыло', 'Количество' => 8],
      // ];
      // $dimensionSets = array_unique(
      //   array_map(
      //     function ($row) {
      //       return array_only($row, ClientSettlementRegister::$dimensions);
      //     },
      //     $testArray
      //   ),
      //   SORT_REGULAR
      // );
      // $dimensionSets = array_map(
      //   function ($row) {
      //     $set = [];
      //     foreach ($row as $key => $value) {
      //       $set[] = [$key, $value];
      //     }
      //     return $set;
      //   },
      //   $dimensionSets
      // );
      // logger($dimensionSets);
