@extends('layouts.print')

<?php
use morphos\Russian\NounDeclension;
use morphos\Russian\MoneySpeller;
use function morphos\Russian\inflectName;
use function morphos\Russian\pluralize;
use morphos\Russian\NounPluralization;
use App\Models\ClientAttachmentSection;
use Illuminate\Support\Facades\Config;

function dateFormat($dateString)
{
  return date("d.m.Y", strtotime($dateString));
}
function moneySpell($num) {
  return MoneySpeller::spell($num, MoneySpeller::RUBLE,MoneySpeller::CLARIFICATION_FORMAT);
}
$fmt = numfmt_create( 'ru_RU', NumberFormatter::SPELLOUT );
?>

;

@section('content')

<div class="container" id="print">
  <p align="right">
    Приложение №2 <br>
    к приказу Минэкономразвития России <br>
    от 05.08.2015 №530
  </p>
  <center>
    <h4>
      Опись имущества гражданина
    </h4>
  </center>

  <table class="table table-bordered">
    <colgroup colspan="3">
      <col width="400">
      <col width="200">
      <col width="400">
    </colgroup>
    <thead>
      <tr>
        <th colspan="3">
          <center>
            <h5>Информация о гражданине</h5>
          </center>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Фамилия</td>
        <td>обязательно</td>
        <td>{{$client->Фамилия}}</td>
      </tr>
      <tr>
        <td>Имя</td>
        <td>обязательно</td>
        <td>{{$client->Имя}}</td>
      </tr>
      <tr>
        <td>Отчество</td>
        <td>обязательно</td>
        <td>{{$client->Отчество}}</td>
      </tr>
      <tr>
        <td>в случае изменения фамилии, имени, отчества указать прежние фамилии, имена, отчества</td>
        <td>обязательно</td>
        <td></td>
      </tr>
      <tr>
        <td>дата рождения</td>
        <td>обязательно</td>
        <td>{{dateFormat($client->ДатаРождения)}}</td>
      </tr>
      <tr>
        <td>место рождения</td>
        <td>обязательно</td>
        <td>{{$client->МестоРождения}}</td>
      </tr>
      <tr>
        <td>СНИЛС</td>
        <td>обязательно</td>
        <td>{{$client->СНИЛС}}</td>
      </tr>
      <tr>
        <td>ИНН</td>
        <td>обязательно</td>
        <td>{{$client->ИНН}}</td>
      </tr>
      <tr>
        <td colspan="3">документ, удостоверяющий личность</td>
      </tr>
      <tr>
        <td>вид документа</td>
        <td>обязательно</td>
        <td>Паспорт РФ</td>
      </tr>
      <tr>
        <td>серия (при наличии) и номер</td>
        <td>обязательно</td>
        <td>{{$client->passport->Серия." ".$client->passport->Номер}}</td>
      </tr>
      <tr>
        <td colspan="3">адрес регистрации по месту жительства в Российской Федерации</td>
      </tr>
      <tr>
        <td>субъект Российской Федерации</td>
        <td>обязательно</td>
        <td>{{$client->address->Регион}}</td>
      </tr>
      <tr>
        <td>район</td>
        <td>обязательно</td>
        <td>{{$client->address->Район}}</td>
      </tr>
      <tr>
        <td>город</td>
        <td>обязательно</td>
        <td>{{$client->address->Город}}</td>
      </tr>
      <tr>
        <td>населенный пункт (село, поселок и так далее)</td>
        <td>обязательно</td>
        <td>{{$client->address->НаселенныйПункт}}</td>
      </tr>
      <tr>
        <td>улица (проспект, переулок и так далее) </td>
        <td>обязательно</td>
        <td>{{$client->address->Улица}}</td>
      </tr>
      <tr>
        <td>номер дома (владения) </td>
        <td>обязательно</td>
        <td>{{$client->address->Дом}}</td>
      </tr>
      <tr>
        <td>номер корпуса (строения) </td>
        <td>обязательно</td>
        <td>{{$client->address->Корпус}}</td>
      </tr>
      <tr>
        <td>номер квартиры (офиса) </td>
        <td>обязательно</td>
        <td>{{$client->address->Квартира}}</td>
      </tr>
    </tbody>
  </table>
  <div class="pageBreak">
  </div>
  <table class="table table-bordered">
    <colgroup>
      <col width="70">
      <col width="400">
      <col width="200">
      <col width="400">
      <col width="200">
      <col width="300">
      <col width="300">
    </colgroup>
    <tbody>
      <tr>
        <th colspan="7">
          <center>
            <h5>
              I. Недвижимое имущество
            </h5>
          </center>
        </th>
      </tr>
      <tr>
        <th>№ п/п</th>
        <th>Вид и наименование имущества</th>
        <th>Вид собственности</th>
        <th>Местонахождение (адрес)</th>
        <th>Площадь (кв. м)</th>
        <th>Основание приобретения и стоимость</th>
        <th>Сведения о залоге и залогодержателе</th>
      </tr>
      @foreach (Config::get('enumerations.realty.types') as $reaty_type)
      <tr>
        <td class="firstCell">{{"1".".".$loop->iteration}}</td>
        <td class="firstCell">{{$reaty_type['plural']}}</td>
        <td class="firstCell"></td>
        <td class="firstCell"></td>
        <td class="firstCell"></td>
        <td class="firstCell"></td>
        <td class="firstCell"></td>
      </tr>
      @if (count($client->realties()->where('ВидИмущества',$reaty_type['value'])->get())>0)
      @foreach ($client->realties()->where('ВидИмущества',$reaty_type['value'])->get() as $row)
      <tr>
        <td class="innerCell"></td>
        <td class="innerCell">{{$loop->iteration}}) {{$row->Наименование}}</td>
        <td class="innerCell">{{$row->ВидСобственности}}</td>
        <td class="innerCell">{{$row->Адрес}}</td>
        <td class="innerCell">{{$row->Площадь}}</td>
        <td class="innerCell">{{$row->ОснованиеПриобретения}}</td>
        <td class="innerCell">{{$row->СведенияОЗалоге}}</td>
      </tr>
      @endforeach
      @else
      <tr>
        <td class="lastCell"></td>
        <td class="lastCell">отсутствует</td>
        <td class="lastCell"></td>
        <td class="lastCell"></td>
        <td class="lastCell"></td>
        <td class="lastCell"></td>
        <td class="lastCell"></td>
      </tr>
      @endif
      @endforeach
    </tbody>
  </table>

  <table class="table table-bordered">
    <colgroup>
      <col width="70">
      <col width="400">
      <col width="200">
      <col width="200">
      <col width="400">
      <col width="200">
      <col width="300">
    </colgroup>
    <tbody>
      <tr>
        <th colspan="7">
          <center>
            <h5>
              II. Движимое имущество
            </h5>
          </center>
        </th>
      </tr>
      <tr>
        <th>№ п/п</th>
        <th>Вид, марка, модель транспорт¬ного средства, год изготовления</th>
        <th>Идентификационный номер </th>
        <th>Вид собственности </th>
        <th>Местонахождение/место хранения</th>
        <th>Стоимость, руб.</th>
        <th>Сведения о залоге и залогодержателе</th>
      </tr>
      @foreach (Config::get('enumerations.auto.types') as $auto_type)
      <tr>
        <td class="firstCell">{{"2".".".$loop->iteration}}</td>
        <td class="firstCell">{{$auto_type['plural']}}</td>
        <td class="firstCell"></td>
        <td class="firstCell"></td>
        <td class="firstCell"></td>
        <td class="firstCell"></td>
        <td class="firstCell"></td>
      </tr>
      @if (count($client->autos()->where('ВидТС',$auto_type['value'])->get())>0)
      @foreach ($client->autos()->where('ВидТС',$auto_type['value'])->get() as $row)
      <tr>
        <td class="innerCell"></td>
        <td class="innerCell">{{$loop->iteration}}) {{$row->Наименование}} {{$row->ГодВыпуска}}г.в.</td>
        <td class="innerCell">{{$row->ИдентификационныйНомер}}</td>
        <td class="innerCell">{{$row->ВидСобственности}}</td>
        <td class="innerCell">{{$row->Адрес}}</td>
        <td class="innerCell">{{$row->Стоимость}}</td>
        <td class="innerCell">{{$row->СведенияОЗалоге}}</td>
      </tr>
      @endforeach
      @else
      <tr>
        <td class="lastCell"></td>
        <td class="lastCell">отсутствует</td>
        <td class="lastCell"></td>
        <td class="lastCell"></td>
        <td class="lastCell"></td>
        <td class="lastCell"></td>
        <td class="lastCell"></td>
      </tr>
      @endif
      @endforeach
    </tbody>
  </table>

  <table class="table table-bordered">
    <colgroup>
      <col width="70">
      <col width="500">
      <col width="200">
      <col width="200">
      <col width="200">
    </colgroup>
    <tbody>
      <tr>
        <th colspan="5">
          <center>
            <h5>
              III. Сведения о счетах в банках и иных кредитных организациях
            </h5>
          </center>
        </th>
      </tr>
      <tr>
        <th>№ п/п</th>
        <th>Наименование и адрес банка или иной кредитной организации</th>
        <th>Вид и валюта счета</th>
        <th>Дата открытия счета</th>
        <th>Остаток на счете, руб.</th>
      </tr>
      @foreach ($client->bankAccounts as $row)
      <tr>
        <td>{{"3".".".$loop->iteration}}</td>
        <td>{{$row->bank->Наименование}} {{$row->bank->Адрес}}</td>
        <td>{{$row->ВидСчета}}, {{$row->ВалютаСчета}}</td>
        <td>{{dateFormat($row->ДатаОткрытия)}}</td>
        <td>{{$row->Остаток}}</td>
      </tr>
      @endforeach
    </tbody>
  </table>

  <table class="table table-bordered">
    <colgroup>
      <col width="70">
      <col width="400">
      <col width="300">
      <col width="200">
      <col width="200">
      <col width="200">
    </colgroup>
    <tbody>
      <tr>
        <th colspan="6">
          <center>
            <h5>
              IV. Акции и иное участие в коммерческих организациях
            </h5>
          </center>
        </th>
      </tr>
      <tr>
        <th>№ п/п</th>
        <th>Наименование и организационно-правовая форма организации</th>
        <th>Местонахождение организации (адрес)</th>
        <th>Уставный, складочный капитал, паевый фонд (руб.)</th>
        <th>Доля участия</th>
        <th>Основание участия</th>
      </tr>
      <tr>
        <td>4.1</td>
        <td>отсутствует</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>

  <table class="table table-bordered">
    <colgroup>
      <col width="70">
      <col width="400">
      <col width="300">
      <col width="200">
      <col width="200">
      <col width="200">
    </colgroup>
    <tbody>
      <tr>
        <th colspan="6">
          <center>
            <h5>
              V. Иные ценные бумаги
            </h5>
          </center>
        </th>
      </tr>
      <tr>
        <th>№ п/п</th>
        <th>Вид ценной бумаги </th>
        <th>Лицо, выпустившее ценную бумагу</th>
        <th>Номинальная величина обязательства (руб.)</th>
        <th>Общее количество</th>
        <th>Общая стоимость (руб.)</th>
      </tr>
      <tr>
        <td>5.1</td>
        <td>отсутствует</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>

  <table class="table table-bordered">
    <colgroup>
      <col width="70">
      <col width="400">
      <col width="200">
      <col width="200">
      <col width="200">
    </colgroup>
    <tbody>
      <tr>
        <th colspan="5">
          <center>
            <h5>
              VI. Сведения о наличных денежных средствах и ином ценном имуществе
            </h5>
          </center>
        </th>
      </tr>
      <tr>
        <th>№ п/п</th>
        <th>Вид и наименование имущества</th>
        <th>Стоимость (сумма и валюта)</th>
        <th>Место нахождения/место хранения(адрес)</th>
        <th>Сведения о залоге и залогодер¬жателе </th>
      </tr>
      <tr>
        <td>6.1</td>
        <td>Наличные денежные средства: отсутствуют</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>6.2</td>
        <td>Драгоценности, в том числе ювелирные украшения, и другие предметы роскоши: отсутствуют</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>6.3</td>
        <td>Предметы искусства: отсутствуют</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>6.4</td>
        <td>Имущество, необходимое для профессиональных занятий: отсутствует</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>6.5</td>
        <td>Иное ценное имущество: отсутствует</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
  <br><br><br>
  <p>Достоверность и полноту настоящих сведений подтверждаю:</p>
  <br> {{dateFormat($client->ДатаПодачиЗаявления)}} _____________ {{$client->fio()}}
</div>

@endsection