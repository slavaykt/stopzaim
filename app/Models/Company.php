<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Company extends General
{
  use HasFactory;

  protected $guarded = ['created_at', 'updated_at', 'Налоговая', 'МестоРаботы', 'СРО', 'АрбитражныйСуд'];

  protected $attributes = [
    'id' => null,
    'isGroup' => false,
    'parent_id' => null,
    'Наименование' => '',
    'ИНН' => '',
    'ОГРН' => '',
    'КПП' => '',
  ];

  public function address()
  {
    return $this->morphOne(Address::class, 'registerable');
  }

  public function clientTaxInspections()
  {
    return $this->hasMany(Client::class, 'Налоговая');
  }

  public function clientJobs()
  {
    return $this->hasMany(Client::class, 'МестоРаботы');
  }

  public function clientSROs()
  {
    return $this->hasMany(Client::class, 'СРО');
  }

  public function clientArbitries()
  {
    return $this->hasMany(Client::class, 'АрбитражныйСуд');
  }

  public function clientBankAccountBanks()
  {
    return $this->hasMany(ClientBankAccount::class, 'Банк');
  }

  public function clientCreditorCreditors()
  {
    return $this->hasMany(ClientBankAccount::class, 'Банк');
  }

  function dateFormat($dateString)
  {
    return date("d.m.Y", strtotime($dateString));
  }

  public function getLinksAttribute()
  {
    $links = [];
    foreach ($this->clientTaxInspections as $link) {
      $links[] = ['object' => "Клиент $link->Наименование", 'property' => "Налоговая"];
    }
    foreach ($this->clientJobs as $link) {
      $links[] = ['object' => "Клиент $link->Наименование", 'property' => "Место работы"];
    }
    foreach ($this->clientSROs as $link) {
      $links[] = ['object' => "Клиент $link->Наименование", 'property' => "СРО"];
    }
    foreach ($this->clientArbitries as $link) {
      $links[] = ['object' => "Клиент $link->Наименование", 'property' => "Арбитражный суд"];
    }
    foreach ($this->clientBankAccountBanks as $link) {
      $clientName = $link->client->Наименование;
      $links[] = ['object' => "Клиент $clientName", 'collection' => 'Банковские счета', 'property' => "Банк"];
    }
    foreach ($this->clientCreditorCreditors as $link)
      $clientName = $link->client->Наименование; {
      $links[] = ['object' => "Клиент $clientName", 'collection' => 'Кредиторы', 'property' => "Кредитор"];
    }
    $objectColumn  = array_column($links, 'object');
    array_multisort($objectColumn, SORT_ASC, $links);
    return $links;
  }
}
