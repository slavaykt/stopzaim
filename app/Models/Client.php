<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Client extends General
{
  use HasFactory;

  protected $guarded = ['created_at', 'updated_at'];

  protected $attributes = [
    'id' => null,
    'isGroup' => false,
    'parent_id' => null,
    'Наименование' => '',
    'Пол' => '',
    'Фамилия' => '',
    'Имя' => '',
    'Отчество' => '',
    'ДатаРождения' => null,
    'Телефон' => '',
    'ИНН' => '',
    'СНИЛС' => '',
    'МестоРождения' => '',
    'Налоговая' => null,
    'Занятость' => '',
    'МестоРаботы' => null,
    'Должность' => '',
    'ДоходПрошлогоГода' => 0,
    'Госуслуги' => '',
    'СРО' => null,
    'АрбитражныйСуд' => null,
    'ДатаПодачиЗаявления' => null,
    'Комментарий' => '',
    'СемейноеПоложение' => 0,
    'Супруг' => "",
    'Этап' => "",
  ];

  public $collections = [
    'Дети' => 'children',
    'БанковскиеСчета' => 'bankAccounts',
    'Кредиторы' => 'creditors',
    'ИсполнительныеДокументы' => 'executiveDocuments',
    'ОбязательныеПлатежи' => 'taxes',
    'Приложения' => 'attachments',
    'НедвижимоеИмущество' => 'realties',
    'ДвижимоеИмущество' => 'autos',
    'Сделки' => 'deals'
  ];

  public function taxInspection()
  {
    return $this->belongsTo(Company::class, 'Налоговая');
  }

  public function job()
  {
    return $this->belongsTo(Company::class, 'МестоРаботы');
  }

  public function sro()
  {
    return $this->belongsTo(Company::class, 'СРО');
  }

  public function court()
  {
    return $this->belongsTo(Company::class, 'АрбитражныйСуд');
  }

  public function bankAccounts()
  {
    return $this->hasMany(ClientBankAccount::class);
  }

  public function children()
  {
    return $this->hasMany(ClientChild::class);
  }

  public function creditors()
  {
    return $this->hasMany(ClientCreditor::class);
  }

  public function executiveDocuments()
  {
    return $this->hasMany(ClientExecutiveDocument::class);
  }

  public function taxes()
  {
    return $this->hasMany(ClientTax::class);
  }

  public function realties()
  {
    return $this->hasMany(ClientRealty::class);
  }

  public function autos()
  {
    return $this->hasMany(ClientAuto::class);
  }

  public function deals()
  {
    return $this->hasMany(ClientDeal::class);
  }

  public function attachments()
  {
    return $this->hasMany(ClientAttachment::class);
  }

  public function address()
  {
    return $this->morphOne(Address::class, 'registerable');
  }

  public function passport()
  {
    return $this->hasOne(Passport::class);
  }

  public function getAttachmentName($sectionName)
  {
    $sectionId = ClientAttachmentSection::where('Наименование', $sectionName)->first();
    if (!$sectionId) {
      return 'Раздел ' . $sectionName . ' не найден';
    }
    $attachment = $this->attachments()->where('Раздел', $sectionId->id)->first();
    if ($attachment) {
      return $attachment->Наименование;
    } else {
      return "<span class='error'>$sectionName отсутствует</span>";
    }
  }

  public function taxesTotal()
  {
    return $this->taxes->sum('Недоимка') + $this->taxes->sum('ШтрафыПени');
  }

  public function bankAccountsGrouped()
  {
    $result = [];
    foreach ($this->bankAccounts->groupBy('Банк') as $bank) {
      $result[] = [
        'банк' => $bank[0]->bank->Наименование,
        'текущий' => $bank->where('ВидСчета', 'текущий')->count(),
        'вклад' => $bank->where('ВидСчета', 'вклад')->count()
      ];
    }
    return $result;
  }

  public function fio()
  {
    return $this->Фамилия . " " . mb_substr($this->Имя, 0, 1) . "." . mb_substr($this->Отчество, 0, 1) . ".";
  }

}
