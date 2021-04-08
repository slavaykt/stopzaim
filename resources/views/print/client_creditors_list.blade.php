@extends('layouts.print')

<?php
use morphos\Russian\NounDeclension;
use morphos\Russian\MoneySpeller;
use function morphos\Russian\inflectName;
use function morphos\Russian\pluralize;
use App\Models\ClientAttachmentSection;

function dateFormat($dateString)
{
  return date("d.m.Y", strtotime($dateString));
}
function moneySpell($num) {
  return MoneySpeller::spell($num, MoneySpeller::RUBLE,MoneySpeller::CLARIFICATION_FORMAT);
}
$fmt = numfmt_create( 'ru_RU', NumberFormatter::SPELLOUT );
?>

@section('content')

<div class="container" id="print">
  <p align="right">
    Приложение №1 <br>
    к приказу Минэкономразвития России <br>
    от 05.08.2015 №530
  </p>
  <center>
    <h4>
      Список кредиторов и должников гражданина
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
      <col width="200">
      <col width="200">
      <col width="400">
      <col width="300">
      <col width="150">
      <col width="150">
      <col width="150">
    </colgroup>
    <thead>
      <tr>
        <th colspan="8">
          <center>
            <h5>
              I. Сведения о кредиторах гражданина (по денежным обязательствам и (или) обязанности
              по уплате обязательных платежей, за исключением возникших в
              результате осуществления гражданином предпринимательской деятельности)
            </h5>
          </center>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>
          1
        </th>
        <th colspan="7">
          <center>Денежные обязательства</center>
        </th>
      </tr>
      <tr>
        <th rowspan="2">№ п/п</th>
        <th rowspan="2">Содержание обязательства</th>
        <th rowspan="2">Кредитор</th>
        <th rowspan="2">Место нахождения (место жительства) кредитора</th>
        <th rowspan="2">Основание возникновения</th>
        <th colspan="2">Сумма обязательства</th>
        <th rowspan="2">Штрафы, пени и иные санкции</th>
      </tr>
      <tr>
        <th>Всего</th>
        <th>в том числе задолжен-ность</th>
      </tr>
      @foreach ($client->creditors as $row)
      <tr>
        <td>{{"1".".".$loop->iteration}}</td>
        <td>{{$row->СодержаниеОбязательства}}</td>
        <td>{{$row->creditor->Наименование}}</td>
        <td>{{$row->creditor->Адрес}}</td>
        <td>{{$row->ОснованиеВозникновения}}</td>
        <td>{{$row->СуммаВсего}}</td>
        <td>{{$row->СуммаЗадолженность}}</td>
        <td>{{$row->ШтрафыПени}}</td>
      </tr>
      @endforeach
    </tbody>
  </table>
  <table class="table table-bordered">
    <colgroup>
      <col width="70">
      <col width="400">
      <col width="200">
      <col width="200">
    </colgroup>
    <thead>
      <tr>
        <th>2</th>
        <th colspan="3">
          <center>Обязательные платежи</center>
        </th>
      </tr>
      <tr>
        <th>№ п/п</th>
        <th>Наименование налога, сбора или иного обязательного платежа</th>
        <th>Недоимка</th>
        <th>Штрафы, пени и иные санкции</th>
      </tr>
    </thead>
    <tbody>
      @foreach ($client->taxes as $row)
      <tr>
        <td>{{"2".".".$loop->iteration}}</td>
        <td>{{$row->НаименованиеНалогаСбора}}</td>
        <td>{{$row->Недоимка}}</td>
        <td>{{$row->ШтрафыПени}}</td>
      </tr>
      @endforeach
    </tbody>
  </table>
  <p>
    Сведения о неденежных обязательствах гражданина, за исключением возникших в результате
    осуществления гражданином предпринимательской деятельности (в том числе о передаче имущества
    в собственность, выполнении работ и оказании услуг и так далее):
  </p>
  <br>
  <hr>
  <br>
  <hr>
  <br>
  <hr>
  <div class="pageBreak"></div>
  <table class="table table-bordered">
    <colgroup>
      <col width="70">
      <col width="200">
      <col width="200">
      <col width="400">
      <col width="300">
      <col width="150">
      <col width="150">
      <col width="150">
    </colgroup>
    <thead>
      <tr>
        <th colspan="8">
          <center>
            <h5>
              II. Сведения о кредиторах гражданина (по денежным обязательствам и (или) обязанности
              по уплате обязательных платежей, которые возникли в
              результате осуществления гражданином предпринимательской деятельности)
            </h5>
          </center>
        </th>
      </tr>
      <tr>
        <th>
          1
        </th>
        <th colspan="7">
          <center>Денежные обязательства</center>
        </th>
      </tr>
      <tr>
        <th rowspan="2">№ п/п</th>
        <th rowspan="2">Содержание обязательства</th>
        <th rowspan="2">Кредитор</th>
        <th rowspan="2">Место нахождения (место жительства) кредитора</th>
        <th rowspan="2">Основание возникновения</th>
        <th colspan="2">Сумма обязательства</th>
        <th rowspan="2">Штрафы, пени и иные санкции</th>
      </tr>
      <tr>
        <th>Всего</th>
        <th>в том числе задолжен-ность</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1.1</td>
        <td>отсутствуют</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>1.2</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>1.3</td>
        <td></td>
        <td></td>
        <td></td>
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
    </colgroup>
    <thead>
      <tr>
        <th>2</th>
        <th colspan="3">
          <center>Обязательные платежи</center>
        </th>
      </tr>
      <tr>
        <th>№ п/п</th>
        <th>Наименование налога, сбора или иного обязательного платежа</th>
        <th>Недоимка</th>
        <th>Штрафы, пени и иные санкции</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2.1</td>
        <td>отсутствуют</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>2.2</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>2.3</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
  <p>
    Сведения о неденежных обязательствах гражданина, которые возникли в результате
    осуществления гражданином предпринимательской деятельности (в том числе о передаче имущества
    в собственность, выполнении работ и оказании услуг и так далее):
  </p>
  <br>
  <hr>
  <br>
  <hr>
  <br>
  <hr>
  <div class="pageBreak"></div>
  <table class="table table-bordered">
    <colgroup>
      <col width="70">
      <col width="200">
      <col width="200">
      <col width="400">
      <col width="300">
      <col width="150">
      <col width="150">
      <col width="150">
    </colgroup>
    <thead>
      <tr>
        <th colspan="8">
          <center>
            <h5>
              III. Сведения о должниках гражданина (по денежным обязательствам и (или) обязанности
              по уплате обязательных платежей, за исключением возникших в
              результате осуществления гражданином предпринимательской деятельности)
            </h5>
          </center>
        </th>
      </tr>
      <tr>
        <th>
          1
        </th>
        <th colspan="7">
          <center>Денежные обязательства</center>
        </th>
      </tr>
      <tr>
        <th rowspan="2">№ п/п</th>
        <th rowspan="2">Содержание обязательства</th>
        <th rowspan="2">Должник</th>
        <th rowspan="2">Место нахождения (место жительства) должника</th>
        <th rowspan="2">Основание возникновения</th>
        <th colspan="2">Сумма обязательства</th>
        <th rowspan="2">Штрафы, пени и иные санкции</th>
      </tr>
      <tr>
        <th>Всего</th>
        <th>в том числе задолжен-ность</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1.1</td>
        <td>отсутствуют</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>1.2</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>1.3</td>
        <td></td>
        <td></td>
        <td></td>
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
    </colgroup>
    <thead>
      <tr>
        <th>2</th>
        <th colspan="3">
          <center>Обязательные платежи</center>
        </th>
      </tr>
      <tr>
        <th rowspan="2">№ п/п</th>
        <th rowspan="2">Наименование налога, сбора или иного обязательного платежа</th>
        <th>Сумма к зачету или возврату</th>
      </tr>
      <tr>
        <th>Всего</th>
        <th>Проценты</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2.1</td>
        <td>отсутствуют</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>2.2</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>2.3</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
  <p>
    Сведения о неденежных обязательствах перед гражданином, за исключением возникших в результате
    осуществления гражданином предпринимательской деятельности (в том числе о передаче имущества
    в собственность, выполнении работ и оказании услуг и так далее):
  </p>
  <br>
  <hr>
  <br>
  <hr>
  <br>
  <hr>
  <div class="pageBreak"></div>
  <table class="table table-bordered">
    <colgroup>
      <col width="70">
      <col width="200">
      <col width="200">
      <col width="400">
      <col width="300">
      <col width="150">
      <col width="150">
      <col width="150">
    </colgroup>
    <thead>
      <tr>
        <th colspan="8">
          <center>
            <h5>
              IV. Сведения о должниках гражданина (по денежным обязательствам и (или) обязанности
              по уплате обязательных платежей, которые возникли в
              результате осуществления гражданином предпринимательской деятельности)
            </h5>
          </center>
        </th>
      </tr>
      <tr>
        <th>
          1
        </th>
        <th colspan="7">
          <center>Денежные обязательства</center>
        </th>
      </tr>
      <tr>
        <th rowspan="2">№ п/п</th>
        <th rowspan="2">Содержание обязательства</th>
        <th rowspan="2">Должник</th>
        <th rowspan="2">Место нахождения (место жительства) должника</th>
        <th rowspan="2">Основание возникновения</th>
        <th colspan="2">Сумма обязательства</th>
        <th rowspan="2">Штрафы, пени и иные санкции</th>
      </tr>
      <tr>
        <th>Всего</th>
        <th>в том числе задолжен-ность</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1.1</td>
        <td>отсутствуют</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>1.2</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>1.3</td>
        <td></td>
        <td></td>
        <td></td>
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
    </colgroup>
    <thead>
      <tr>
        <th>2</th>
        <th colspan="3">
          <center>Обязательные платежи</center>
        </th>
      </tr>
      <tr>
        <th rowspan="2">№ п/п</th>
        <th rowspan="2">Наименование налога, сбора или иного обязательного платежа</th>
        <th>Сумма к зачету или возврату</th>
      </tr>
      <tr>
        <th>Всего</th>
        <th>Проценты</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2.1</td>
        <td>отсутствуют</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>2.2</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>2.3</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
  <p>
    Сведения о неденежных обязательствах перед гражданином, которые возникли в результате
    осуществления гражданином предпринимательской деятельности (в том числе о передаче имущества
    в собственность, выполнении работ и оказании услуг и так далее):
  </p>
  <br>
  <hr>
  <br>
  <hr>
  <br>
  <hr>
  <p>Достоверность и полноту настоящих сведений подтверждаю:</p>
  <br> {{dateFormat($client->ДатаПодачиЗаявления)}} _____________ {{$client->fio()}}


</div>

@endsection