<?php

namespace App\Http\Controllers;

use App\Models\CashExpenseOrder;
use App\Models\CashIncomeOrder;
use App\Models\Client;
use App\Models\ClientAttachment;
use App\Models\ClientAttachmentSection;
use App\Models\ClientDeal;
use App\Models\clt;
use App\Models\Company;
use App\Models\Contract;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImportController extends Controller
{
  public function show()
  {
    return view('import');
  }

  public function upload(Request $request)
  {
    function add_company($payload)
    {
      $company = Company::updateOrCreate(['Наименование' => $payload['Наименование']], array_except($payload, ['Наименование', 'Адрес']));
      $address = $payload['Адрес'];
      if ($address) {
        $company->address()->updateOrCreate(array_only($address, ['Регион']), $address);
      }
      $company->save();
      return $company;
    }
    function dateFormat($dateString)
    {
      return date("d.m.Y", strtotime($dateString));
    }

    $content = json_decode(file_get_contents($request->file('exchange')->getRealPath()), true);

    foreach ($content['Клиенты'] as $clt) {

      $props = array_filter($clt['Реквизиты'], function ($item) {
        return gettype($item) !== 'array';
      });

      $relationsToCompany = array_filter($clt['Реквизиты'], function ($item) {
        return gettype($item) === 'array' ? array_has($item, 'ИНН') : false;
      });

      $client = Client::updateOrCreate(['Наименование' => $clt['Реквизиты']['Наименование']], $props);
      foreach ($relationsToCompany as $key => $relation) {
        if ($relation['Наименование']) {
          $company = add_company($relation);
          $client[$key] = $company->id;
        } else {
          $client[$key] = null;
        }
      }
      $address = $clt['Реквизиты']['Адрес'];
      if ($address) {
        $client->address()->updateOrCreate(array_only($address, ['Регион']), $address);
      }
      $passport = $clt['Реквизиты']['Паспорт'];
      if ($passport) {
        $client->passport()->updateOrCreate(array_only($passport, ['Серия']), $passport);
      }
      if (array_has($clt, 'Дети')) {
        foreach ($clt['Дети'] as $item) {
          $client->children()->updateOrCreate(array_only($item, ['ФИО']), $item);
        }
      }
      if (array_has($clt, 'БанковскиеСчета')) {
        $client->bankAccounts()->delete();
        foreach ($clt['БанковскиеСчета'] as $item) {
          $account = $client->bankAccounts()->create(array_except($item, ['Банк']));
          $company = add_company($item['Банк']);
          $account->Банк = $company->id;
          $account->save();
        }
      }
      if (array_has($clt, 'Кредиторы')) {
        $client->creditors()->delete();
        foreach ($clt['Кредиторы'] as $item) {
          $creditor = $client->creditors()->create(array_except($item, ['Кредитор']));
          $company = add_company($item['Кредитор']);
          $creditor->Кредитор = $company->id;
          $creditor->save();
        }
      }
      if (array_has($clt, 'ИсполнительныеДокументы')) {
        $client->executiveDocuments()->delete();
        foreach ($clt['ИсполнительныеДокументы'] as $item) {
          $client->executiveDocuments()->create($item);
        }
      }
      if (array_has($clt, 'ОбязательныеПлатежи')) {
        $client->taxes()->delete();
        foreach ($clt['ОбязательныеПлатежи'] as $item) {
          $client->taxes()->create($item);
        }
      }
      $client->deals()->delete();
      if (array_has($clt, 'НедвижимоеИмущество')) {
        $client->realties()->delete();
        foreach ($clt['НедвижимоеИмущество'] as $item) {
          $realty = $client->realties()->create(array_except($item, ['Сделки']));
          foreach ($item['Сделки'] as $dealData) {
            $deal = new ClientDeal($dealData);
            $deal->dealable()->associate($realty);
            $client->deals()->save($deal);
          }
        }
      }
      if (array_has($clt, 'ДвижимоеИмущество')) {
        $client->autos()->delete();
        foreach ($clt['ДвижимоеИмущество'] as $item) {
          $auto = $client->autos()->create(array_except($item, ['Сделки']));
          foreach ($item['Сделки'] as $dealData) {
            $deal = new ClientDeal($dealData);
            $deal->dealable()->associate($auto);
            $client->deals()->save($deal);
          }
        }
      }
      if (array_has($clt, 'Приложения')) {
        $client->attachments()->delete();
        foreach ($clt['Приложения'] as $item) {
          $item['Дата'] = dateFormat($item['Дата']);
          switch ($item['ВидДокумента']) {
            case 'Справка о задолженности':
              $attachment = new ClientAttachment;
              $attachment->Раздел = ClientAttachmentSection::where('Наименование', 'справки о задолженности')->first()->id;
              if (!array_has($item, ['КредитныйДоговор'])) {
                $item['КредитныйДоговор'] = "";
              }
              $attachment->Наименование = "справка {$item['КемВыдано']} по состоянию на {$item['Дата']} по {$item['КредитныйДоговор']}";
              $client->attachments()->save($attachment);
              break;
            case 'Справка об отсутствии ИП':
              $attachment = new ClientAttachment;
              $attachment->Раздел = ClientAttachmentSection::where('Наименование', 'справка о наличии ИП')->first()->id;
              $attachment->Наименование = "Справка из Единого государственного реестра индивидуальных предпринимателей по состоянию на {$item['Дата']}";
              $client->attachments()->save($attachment);
              break;
            case 'Сведения СЗИ':
              $attachment = new ClientAttachment;
              $attachment->Раздел = ClientAttachmentSection::where('Наименование', 'сведения ИЛС')->first()->id;
              $attachment->Наименование = "Сведения о состоянии индивидуального лицевого счета застрахованного лица, форма СЗИ-ИЛС от {$item['Дата']}, прилагаю";
              $client->attachments()->save($attachment);
              break;
            case 'Документ об оплате депозита':
              $attachment = new ClientAttachment;
              $attachment->Раздел = ClientAttachmentSection::where('Наименование', 'депозит')->first()->id;
              $attachment->Наименование = "Чек-ордер на оплату депозита {$item['КемВыдано']} от {$item['Дата']} с назначение платежа: Внесение средств на депозит арбитражного управляющего";
              $client->attachments()->save($attachment);
              break;
            case 'Документ об оплате госпошлины':
              $attachment = new ClientAttachment;
              $attachment->Раздел = ClientAttachmentSection::where('Наименование', 'госпошлина')->first()->id;
              $attachment->Наименование = "Чек-ордер на оплату госпошлины {$item['КемВыдано']} от {$item['Дата']} с назначение платежа: Госпошлина";
              $client->attachments()->save($attachment);
              break;
            case 'Справка Росреестр':
              $attachment = new ClientAttachment;
              $attachment->Раздел = ClientAttachmentSection::where('Наименование', 'росреестр')->first()->id;
              $attachment->Наименование = "Выписка из Единого государственного реестра недвижимости о правах отдельного лица на имевшиеся (имеющиеся) у него объекты недвижимости №{$item['Номер']} от {$item['Дата']}г";
              $client->attachments()->save($attachment);
              break;
            case 'Справка ГИБДД':
              $attachment = new ClientAttachment;
              $attachment->Раздел = ClientAttachmentSection::where('Наименование', 'гибдд')->first()->id;
              $attachment->Наименование = "Справка с МРЭО ГИБДД МВД по РС(Я) от {$item['Дата']} №{$item['Номер']}";
              $client->attachments()->save($attachment);
              break;
            case 'Справка об отсутствии судимости':
              $attachment = new ClientAttachment;
              $attachment->Раздел = ClientAttachmentSection::where('Наименование', 'справка о судимости')->first()->id;
              $attachment->Наименование = "Справка о наличии (отсутствии) судимости и (или) факта уголовного преследования либо прекращении уголовного преследования №{$item['Номер']} от {$item['Дата']}. выданная {$item['КемВыдано']}";
              $client->attachments()->save($attachment);
              break;
            case 'Свидетельство о заключении брака':
              $attachment = new ClientAttachment;
              $attachment->Раздел = ClientAttachmentSection::where('Наименование', 'свидетельство о браке')->first()->id;
              $attachment->Наименование = "Свидетельство о заключении брака с {$item['ФИОСупруг']} серия {$item['Серия']} №{$item['Номер']} от {$item['Дата']}г. прилагаю";
              $client->attachments()->save($attachment);
              break;
            case 'Справка ЦЗН':
              $attachment = new ClientAttachment;
              $attachment->Раздел = ClientAttachmentSection::where('Наименование', 'Справка ЦЗН')->first()->id;
              $attachment->Наименование = "Справка {$item['КемВыдано']} №{$item['Номер']} от {$item['Дата']}г.";
              $client->attachments()->save($attachment);
              break;
            case 'Справка о доходах':
              $attachment = new ClientAttachment;
              $attachment->Раздел = ClientAttachmentSection::where('Наименование', 'справки о доходах')->first()->id;
              $attachment->Наименование = "Справка о доходах и суммах налога физического лица за {$item['Год']} от {$item['Дата']}, выданная {$item['КемВыдано']}";
              $client->attachments()->save($attachment);
              break;
            case 'Свидетельство о рождении':
              $attachment = new ClientAttachment;
              $attachment->Раздел = ClientAttachmentSection::where('Наименование', 'свидетельство о рождении')->first()->id;
              $attachment->Наименование = "Свидетельство о рождении {$item['ФИОРебенка']}, серия {$item['Серия']} №{$item['Номер']} от {$item['Дата']}г., прилагаю";
              $client->attachments()->save($attachment);
              break;
            case 'Свидетельство о расторжении брака':
              $attachment = new ClientAttachment;
              $attachment->Раздел = ClientAttachmentSection::where('Наименование', 'свидетельство о расторжении брака')->first()->id;
              $attachment->Наименование = "Свидетельство о расторжении брака с {$item['ФИОСупруг']} серия {$item['Серия']} №{$item['Номер']} от {$item['Дата']}г. прилагаю";
              $client->attachments()->save($attachment);
              break;
            case 'Брачный договор':
              $attachment = new ClientAttachment;
              $attachment->Раздел = ClientAttachmentSection::where('Наименование', 'брачный договор')->first()->id;
              $attachment->Наименование = "Брачный договор с {$item['ФИОСупруг']} серия {$item['Серия']} №{$item['Номер']} от {$item['Дата']}г. прилагаю";
              $client->attachments()->save($attachment);
              break;
            case 'Выписка':
              $attachment = new ClientAttachment;
              $attachment->Раздел = ClientAttachmentSection::where('Наименование', 'выписки по счетам')->first()->id;
              $item['НачалоПериода'] = dateFormat($item['НачалоПериода']);
              $item['ОкончаниеПериода'] = dateFormat($item['ОкончаниеПериода']);
              $attachment->Наименование = "выписка по счету №{$item['Номер']}, за период с {$item['НачалоПериода']}. по {$item['ОкончаниеПериода']}., {$item['КемВыдано']}";
              $client->attachments()->save($attachment);
              break;
            case 'Справка о назначенной пенсии':
              $attachment = new ClientAttachment;
              $attachment->Раздел = ClientAttachmentSection::where('Наименование', 'справка о пенсии')->first()->id;
              $attachment->Наименование = "Справка о назначенных пенсиях и социальных выплатах №{$item['Номер']} от {$item['Дата']}";
              $client->attachments()->save($attachment);
              break;
            case 'Иной документ':
              $attachment = new ClientAttachment;
              $attachment->Раздел = ClientAttachmentSection::where('Наименование', 'иные документы')->first()->id;
              $attachment->Наименование = "{$item['НаименованиеДокумента']} серия {$item['Серия']} номер {$item['Номер']} от {$item['Дата']} ";
              $client->attachments()->save($attachment);
              break;
            case 'Свидетельство о смерти супруга':
              $attachment = new ClientAttachment;
              $attachment->Раздел = ClientAttachmentSection::where('Наименование', 'иные документы')->first()->id;
              $attachment->Наименование = "свидетельство о смерти супруга {$item['ФИОСупруг']} серия {$item['Серия']} номер {$item['Номер']} от {$item['Дата']} ";
              $client->attachments()->save($attachment);
              break;
            default:
              break;
          }
        }
      }

      $client->save();
    }

    foreach ($content['Договора'] as $cnt) {
      $contract = Contract::updateOrCreate(['Дата' => $cnt['Дата'], 'Номер' => $cnt['Номер']], array_only($cnt, ['Дата', 'Номер', 'Сумма']));
      $client = Client::where('Наименование', $cnt['Клиент'])->first();
      $contract->client()->associate($client);
      foreach ($cnt['График'] as $payment) {
        $contract->payments()->updateOrCreate(['Дата' => $payment['Дата']], $payment);
      }
      $contract->save();
    }

    foreach ($content['ПКО'] as $inc) {
      $cashIncome = CashIncomeOrder::firstOrNew(['Дата' => $inc['Дата'], 'Номер' => $inc['Номер']]);
      $cashIncome->fill(array_except($inc, ['Клиент']));
      $client = Client::where('Наименование', $inc['Клиент'])->first();
      $cashIncome->client()->associate($client);
      if (isset($client)) {
        $cashIncome->ПринятоОт = $client->Наименование;
      }
      $cashIncome->save();
    }

    foreach ($content['РКО'] as $exp) {
      $cashExpense = CashExpenseOrder::firstOrNew(['Дата' => $inc['Дата'], 'Номер' => $inc['Номер']]);
      $cashExpense->fill($exp);
      $cashExpense->save();
    }

    return redirect()->route('import.show');
  }
}
