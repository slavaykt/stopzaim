import { data } from 'jquery';
import React, { Component } from 'react';
import { useDateFormat } from '../../hooks/date.format.hook';

const PrintForm = ({ data }) => {
  const { localeDate, localeDateFullMonth } = useDateFormat();
  var rubles = require('rubles').rubles;

  const ucFirst = (str) => {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
  }

  const NumFormat = new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2 });

  return (
    <table width="100%">
      <tbody>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="3" rowSpan="1" style={{ width: "px", font: "normal 6pt Arial", textAlign: "right", }}>Унифицированная форма КО-1</td>
          <td colSpan="1" rowSpan="38" style={{ width: "6.50px", font: "normal 8pt Arial", textAlign: "center", }}></td>
          <td colSpan="1" rowSpan="38" style={{ width: "7.75px", font: "normal 6pt Arial", textAlign: "center", borderLeft: "2px solid black", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="5" rowSpan="1" style={{ width: "px", font: "normal 6pt Arial", textAlign: "right", }}>Утверждена постановлением Госкомстата России от 18.08.98 № 88</td>
          <td colSpan="5" rowSpan="1" style={{ width: "18.00px", font: "bold 8pt Arial", textAlign: "center", borderBottom: "1px solid black", }}>ООО "Возрождение"</td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "22.25px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="5" rowSpan="1" style={{ width: "18.00px", font: "normal 6pt Arial", textAlign: "center", }}>организация</td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "22.25px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="2" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "center", borderTop: "1px solid black", borderBottom: "1px solid black", borderLeft: "1px solid black", borderRight: "1px solid black", }}>Коды</td>
          <td colSpan="5" rowSpan="1" style={{ width: "18.00px", font: "bold 9pt Arial", textAlign: "center", }}>КВИТАНЦИЯ</td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "right", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="2" rowSpan="1" style={{ width: "22.25px", font: "normal 9pt Arial", textAlign: "right", }}>Форма по ОКУД</td>
          <td colSpan="2" rowSpan="1" style={{ width: "18.00px", font: "bold 9pt Arial", textAlign: "center", borderTop: "2px solid black", borderBottom: "1px solid black", borderLeft: "2px solid black", borderRight: "2px solid black", }}>0310001</td>
          <td colSpan="5" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "right", borderBottom: "1px solid black", }}>к приходному кассовому ордеру № {data.Номер}</td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="5" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", borderBottom: "1px solid black", }}>ООО "Возрождение"</td>
          <td colSpan="1" rowSpan="1" style={{ width: "22.25px", font: "normal 9pt Arial", textAlign: "right", }}>по ОКПО</td>
          <td colSpan="2" rowSpan="1" style={{ width: "18.00px", font: "bold 9pt Arial", textAlign: "center", borderTop: "1px solid black", borderBottom: "1px solid black", borderLeft: "2px solid black", borderRight: "2px solid black", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "right", }}>от</td>
          <td colSpan="4" rowSpan="1" style={{ width: "18.00px", font: "bold 8pt Arial", textAlign: "auto", borderBottom: "1px solid black", }}>{localeDate(data.Дата)}</td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="5" rowSpan="1" style={{ width: "18.00px", font: "normal 6pt Arial", textAlign: "center", }}>организация</td>
          <td colSpan="1" rowSpan="1" style={{ width: "22.25px", font: "normal 9pt Arial", textAlign: "auto", }}></td>
          <td colSpan="2" rowSpan="2" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "center", borderTop: "1px solid black", borderBottom: "2px solid black", borderLeft: "2px solid black", borderRight: "2px solid black", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "right", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "right", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "right", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "right", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "right", }}></td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="5" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", borderBottom: "1px solid black", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "22.25px", font: "normal 9pt Arial", textAlign: "auto", }}></td>
          <td colSpan="5" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "left", }}>Принято от</td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="5" rowSpan="1" style={{ width: "18.00px", font: "normal 6pt Arial", textAlign: "center", }}>подразделение</td>
          <td colSpan="1" rowSpan="1" style={{ width: "22.25px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="5" rowSpan="3" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}>{data.ПринятоОт}</td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "22.25px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="4" rowSpan="1" style={{ width: "18.00px", font: "bold 9pt Arial", textAlign: "auto", }}>ПРИХОДНЫЙ КАССОВЫЙ ОРДЕР</td>
          <td colSpan="2" rowSpan="1" style={{ width: "22.25px", font: "normal 8pt Arial", textAlign: "center", borderTop: "1px solid black", borderLeft: "1px solid black", }}>Номер документа</td>
          <td colSpan="2" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "center", borderTop: "1px solid black", borderBottom: "1px solid black", borderLeft: "1px solid black", borderRight: "1px solid black", }}>Дата составления</td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="2" rowSpan="1" style={{ width: "22.25px", font: "normal 9pt Arial", textAlign: "center", borderTop: "2px solid black", borderBottom: "2px solid black", borderLeft: "2px solid black", borderRight: "2px solid black", }}>{data.Номер}</td>
          <td colSpan="2" rowSpan="1" style={{ width: "18.00px", font: "normal 9pt Arial", textAlign: "center", borderTop: "2px solid black", borderBottom: "2px solid black", borderLeft: "2px solid black", borderRight: "2px solid black", }}>{localeDate(data.Дата)}</td>
          <td colSpan="5" rowSpan="2" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}>Основание</td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "22.25px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="4" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "center", borderTop: "1px solid black", borderBottom: "1px solid black", borderLeft: "1px solid black", borderRight: "1px solid black", }}>Дебет</td>
          <td colSpan="4" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "center", borderTop: "1px solid black", borderBottom: "1px solid black", borderLeft: "1px solid black", borderRight: "1px solid black", }}>Кредит</td>
          <td colSpan="1" rowSpan="4" style={{ width: "22.25px", font: "normal 8pt Arial", textAlign: "center", borderTop: "1px solid black", borderBottom: "1px solid black", borderLeft: "1px solid black", borderRight: "1px solid black", }}>Сумма, руб.коп.</td>
          <td colSpan="1" rowSpan="4" style={{ width: "18.00px", font: "normal 6pt Arial", textAlign: "center", borderTop: "1px solid black", borderBottom: "1px solid black", borderLeft: "1px solid black", borderRight: "1px solid black", }}>Код целевого назначения</td>
          <td colSpan="1" rowSpan="4" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "center", borderTop: "1px solid black", borderBottom: "1px solid black", borderLeft: "1px solid black", borderRight: "1px solid black", }}></td>
          <td colSpan="5" rowSpan="3" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "left", }}>{data.ОснованиеПлатежа}</td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="3" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "center", borderTop: "1px solid black", borderBottom: "1px solid black", borderLeft: "1px solid black", borderRight: "1px solid black", }}></td>
          <td colSpan="1" rowSpan="3" style={{ width: "18.00px", font: "normal 6pt Arial", textAlign: "center", borderTop: "1px solid black", borderLeft: "1px solid black", }}>код струк-
          турного подраз-
деления</td>
          <td colSpan="1" rowSpan="3" style={{ width: "18.00px", font: "normal 6pt Arial", textAlign: "center", borderTop: "1px solid black", borderLeft: "1px solid black", }}>корреспон-
          дирующий счет,
субсчет</td>
          <td colSpan="1" rowSpan="3" style={{ width: "18.00px", font: "normal 6pt Arial", textAlign: "center", borderTop: "1px solid black", borderLeft: "1px solid black", }}>код аналити- ческого учета</td>
        </tr>
        <tr style={{ height: "13px" }}>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "center", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "center", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "center", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "center", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "center", }}></td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "center", borderTop: "2px solid black", borderBottom: "2px solid black", borderLeft: "2px solid black", borderRight: "1px solid black", }}>50.1</td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", borderTop: "2px solid black", borderBottom: "2px solid black", borderLeft: "1px solid black", borderRight: "1px solid black", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "center", borderTop: "2px solid black", borderBottom: "2px solid black", borderLeft: "1px solid black", borderRight: "1px solid black", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "center", borderTop: "2px solid black", borderBottom: "2px solid black", borderLeft: "1px solid black", borderRight: "1px solid black", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "center", borderTop: "2px solid black", borderBottom: "2px solid black", borderLeft: "1px solid black", borderRight: "1px solid black", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "22.25px", font: "normal 8pt Arial", textAlign: "right", borderTop: "2px solid black", borderBottom: "2px solid black", borderLeft: "1px solid black", borderRight: "1px solid black", }}>{NumFormat.format(data.Сумма)}</td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "center", borderTop: "2px solid black", borderBottom: "2px solid black", borderLeft: "1px solid black", borderRight: "1px solid black", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", borderTop: "2px solid black", borderBottom: "2px solid black", borderLeft: "1px solid black", borderRight: "2px solid black", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "left", }}>Сумма</td>
          <td colSpan="4" rowSpan="1" style={{ width: "18.00px", font: "bold 8pt Arial", textAlign: "auto", borderBottom: "1px solid black", }}>{NumFormat.format(data.Сумма)}</td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "22.25px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="4" rowSpan="1" style={{ width: "18.00px", font: "normal 6pt Arial", textAlign: "center", }}>цифрами</td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "left", }}>Принято от:</td>
          <td colSpan="7" rowSpan="1" style={{ width: "px", font: "normal 8pt Arial", textAlign: "auto", }}>{data.ПринятоОт}</td>
          <td colSpan="5" rowSpan="3" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}>{ucFirst(rubles(data.Сумма))}</td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "right", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "22.25px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="8" rowSpan="1" style={{ width: "px", font: "normal 8pt Arial", textAlign: "left", }}>Основание:</td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="8" rowSpan="2" style={{ width: "px", font: "normal 8pt Arial", textAlign: "auto", }}>{data.ОснованиеПлатежа}</td>
          <td colSpan="5" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}>В том числе</td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="5" rowSpan="3" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="8" rowSpan="1" style={{ width: "px", font: "normal 8pt Arial", textAlign: "left", }}>Сумма:</td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="8" rowSpan="3" style={{ width: "px", font: "normal 8pt Arial", textAlign: "auto", }}>{ucFirst(rubles(data.Сумма))}</td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="4" rowSpan="1" style={{ width: "18.00px", font: "bold 8pt Arial", textAlign: "auto", borderBottom: "1px solid black", }}>{localeDateFullMonth(data.Дата)}</td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "22.25px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="8" rowSpan="1" style={{ width: "px", font: "normal 8pt Arial", textAlign: "left", }}>В том числе:</td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "bold 8pt Arial", textAlign: "left", }}>М.П. (штампа)</td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "bold 8pt Arial", textAlign: "left", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "22.25px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="8" rowSpan="1" style={{ width: "px", font: "normal 8pt Arial", textAlign: "left", }}>Приложение:</td>
          <td colSpan="2" rowSpan="1" style={{ width: "18.00px", font: "bold 8pt Arial", textAlign: "auto", }}>Главный бухгалтер</td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "22.25px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="2" rowSpan="1" style={{ width: "18.00px", font: "bold 8pt Arial", textAlign: "auto", }}>Главный бухгалтер</td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", borderBottom: "1px solid black", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="4" rowSpan="1" style={{ width: "px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", borderBottom: "1px solid black", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="3" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", borderBottom: "1px solid black", }}></td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 6pt Arial", textAlign: "center", }}>подпись</td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 6pt Arial", textAlign: "center", }}></td>
          <td colSpan="3" rowSpan="1" style={{ width: "px", font: "normal 6pt Arial", textAlign: "center", borderTop: "1px solid black", }}>расшифровка подписи</td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 6pt Arial", textAlign: "center", }}>подпись</td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="3" rowSpan="1" style={{ width: "18.00px", font: "normal 6pt Arial", textAlign: "center", }}>расшифровка подписи</td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "22.25px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "bold 8pt Arial", textAlign: "auto", }}>Кассир</td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="2" rowSpan="1" style={{ width: "18.00px", font: "bold 8pt Arial", textAlign: "auto", }}>Получил кассир</td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", borderBottom: "1px solid black", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="4" rowSpan="1" style={{ width: "px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", borderBottom: "1px solid black", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="3" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", borderBottom: "1px solid black", }}></td>
        </tr>
        <tr style={{ height: "13px" }}>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 6pt Arial", textAlign: "center", }}>подпись</td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 6pt Arial", textAlign: "center", }}></td>
          <td colSpan="3" rowSpan="1" style={{ width: "px", font: "normal 6pt Arial", textAlign: "center", borderTop: "1px solid black", }}>расшифровка подписи</td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 6pt Arial", textAlign: "center", }}>подпись</td>
          <td colSpan="1" rowSpan="1" style={{ width: "18.00px", font: "normal 8pt Arial", textAlign: "auto", }}></td>
          <td colSpan="3" rowSpan="1" style={{ width: "18.00px", font: "normal 6pt Arial", textAlign: "center", }}>расшифровка подписи</td>
        </tr>

      </tbody>
    </table>
  )
}

class CashIncomePrintForm extends Component {
  render() {
    return (
      <PrintForm data={this.props.data} />
    );
  }
}

export default CashIncomePrintForm;
