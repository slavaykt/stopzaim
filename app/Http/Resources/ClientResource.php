<?php

namespace App\Http\Resources;

use App\Models\Address;
use App\Models\ClientAttachment;
use App\Models\ClientAuto;
use App\Models\ClientBankAccount;
use App\Models\ClientChild;
use App\Models\ClientCreditor;
use App\Models\ClientDeal;
use App\Models\ClientExecutiveDocument;
use App\Models\ClientRealty;
use App\Models\ClientTax;
use App\Models\Passport;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{

  public function toArray($request)
  {

    return [
      'id' => $this->id,
      'Наименование' => $this->Наименование,
      'Фамилия' => $this->Фамилия,
      'Имя' => $this->Имя,
      'Отчество' => $this->Отчество,
      'ДатаРождения' => $this->ДатаРождения,
      'Пол' => $this->Пол,
      'Телефон' => $this->Телефон,
      'ИНН' => $this->ИНН,
      'СНИЛС' => $this->СНИЛС,
      'Паспорт' => $this->passport ? $this->passport : new Passport,
      'Адрес' => new AddressResource($this->address ? $this->address : new Address),
      'МестоРождения' => $this->МестоРождения,
      'Налоговая' => $this->taxInspection,
      'Занятость' => $this->Занятость,
      'МестоРаботы' => $this->job,
      'Должность' => $this->Должность,
      'ДоходПрошлогоГода' => $this->ДоходПрошлогоГода,
      'Госуслуги' => $this->Госуслуги,
      'СРО' => $this->sro,
      'АрбитражныйСуд' => $this->court,
      'ДатаПодачиЗаявления' => $this->ДатаПодачиЗаявления,
      'СемейноеПоложение' => $this->СемейноеПоложение,
      'Супруг' => $this->Супруг,
      'Комментарий' => $this->Комментарий,
      'Дети' => ClientChildResource::collection($this->children),
      'БанковскиеСчета' => ClientBankAccountResource::collection($this->bankAccounts),
      'Кредиторы' => ClientCreditorResource::collection($this->creditors),
      'ИсполнительныеДокументы' => ClientExecutiveDocumentResource::collection($this->executiveDocuments),
      'ОбязательныеПлатежи' => ClientTaxResource::collection($this->taxes),
      'НедвижимоеИмущество' => ClientRealtyResource::collection($this->realties),
      'ДвижимоеИмущество' => ClientAutoResource::collection($this->autos),
      'Сделки' => ClientDealResource::collection($this->deals),
      'Приложения' => ClientAttachmentResource::collection($this->attachments),
      'schema' => [
        'Дети' => new ClientChildResource(new ClientChild),
        'БанковскиеСчета' => new ClientBankAccountResource(new ClientBankAccount),
        'Кредиторы' => new ClientCreditorResource(new ClientCreditor),
        'ИсполнительныеДокументы' => new ClientExecutiveDocumentResource(new ClientExecutiveDocument),
        'ОбязательныеПлатежи' => new ClientTaxResource(new ClientTax),
        'НедвижимоеИмущество' => new ClientRealtyResource(new ClientRealty),
        'ДвижимоеИмущество' => new ClientAutoResource(new ClientAuto),
        'Сделки' => new ClientDealResource(new ClientDeal),
        'Приложения' => new ClientAttachmentResource(new ClientAttachment)
      ],
    ];
  }
}
