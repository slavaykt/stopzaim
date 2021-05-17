import React, { useContext, useEffect, useState } from 'react';
import useAxios from "axios-hooks";
import EditForm from './EditForm';
import { useDispatch, useSelector } from 'react-redux';
import { changeCollectionData, loadData } from '../../redux/actions/actions';
import { TabContext } from '../context';
import StandardEditButtons from './StandardEditButtons';
import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { ImportExport, Print } from '@material-ui/icons';
import ExtendableButton from './ExtendableButton';
import PrintButton from './PrintButton';
import { useDateFormat } from '../../hooks/date.format.hook';

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const ClientEdit = () => {

  const dispatch = useDispatch();
  const tabContext = useContext(TabContext);
  const { tabId } = tabContext;
  const enumerations = useSelector(state => state.config.enumerations);
  const [layout, setLayout] = useState([]);
  const { data, sourceTabId, api: tabApi } = useSelector(state => state.app.getTab(tabId));
  const [{ data: attachmentSection, loading: loadingAttachments, error: fetchAttachmentsError }] = useAxios(
    "api/attachment/sections"
  );
  const [{ data: fetchedData, loading, error: fetchError }, refetch] = useAxios(tabApi, { useCache: false });
  const [saving, setSaving] = useState(false);
  const { localeDate } = useDateFormat();
  const classes = useStyles();

  useEffect(() => {
    if (fetchedData) {
      dispatch(loadData(tabId, fetchedData));
    }
  }, [fetchedData]);

  useEffect(() => {
    if (attachmentSection) {
      setLayout([
        {
          type: 'tabPanel',
          size: 12,
          children: [
            {
              type: 'tab',
              header: 'Основное',
              children: [
                {
                  type: 'input',
                  label: 'Код',
                  key: 'id',
                  size: 2,
                  inputType: 'text',
                  readOnly: true
                },
                {
                  type: 'input',
                  label: 'Наименование',
                  key: 'Наименование',
                  size: 10,
                  inputType: 'text'
                },
                {
                  type: 'input',
                  label: 'Фамилия',
                  key: 'Фамилия',
                  size: 4,
                  inputType: 'text'
                },
                {
                  type: 'input',
                  label: 'Имя',
                  key: 'Имя',
                  size: 4,
                  inputType: 'text'
                },
                {
                  type: 'input',
                  label: 'Отчество',
                  key: 'Отчество',
                  size: 4,
                  inputType: 'text'
                },
                {
                  type: 'select',
                  label: 'Пол',
                  key: 'Пол',
                  size: 4,
                  getOptions: () => {
                    return enumerations.sexes;
                  },
                },
                {
                  type: 'date',
                  label: 'Дата рождения',
                  key: 'ДатаРождения',
                  size: 4,
                  inputType: 'date'
                },
                {
                  type: 'input',
                  label: 'Телефон',
                  key: 'Телефон',
                  size: 4,
                  inputType: 'text'
                },
                {
                  type: 'input',
                  label: 'ИНН',
                  key: 'ИНН',
                  size: 6,
                  inputType: 'text'
                },
                {
                  type: 'input',
                  label: 'СНИЛС',
                  key: 'СНИЛС',
                  size: 6,
                  inputType: 'text'
                },
                {
                  type: 'modalComponent',
                  componentName: 'PassportComponent',
                  key: 'Паспорт',
                  size: 12,
                },
                {
                  type: 'modalComponent',
                  componentName: 'AddressComponent',
                  key: 'Адрес',
                  size: 12,
                },
                {
                  type: 'input',
                  label: 'Место рождения',
                  key: 'МестоРождения',
                  size: 6,
                  inputType: 'text'
                },
                {
                  type: 'relationship',
                  label: 'Налоговая',
                  key: 'Налоговая',
                  size: 6,
                  api: '/api/companies',
                },
                {
                  type: 'select',
                  label: 'Занятость',
                  key: 'Занятость',
                  size: 6,
                  getOptions: () => {
                    return enumerations.employment;
                  },
                },
                {
                  type: 'input',
                  label: 'Доход за прошлый год',
                  key: 'ДоходПрошлогоГода',
                  size: 6,
                  inputType: 'number'
                },
                {
                  type: 'relationship',
                  label: 'Место работы',
                  key: 'МестоРаботы',
                  size: 6,
                  api: '/api/companies',
                },
                {
                  type: 'input',
                  label: 'Должность',
                  key: 'Должность',
                  size: 6,
                  inputType: 'text'
                },
                {
                  type: 'relationship',
                  label: 'СРО',
                  key: 'СРО',
                  size: 6,
                  api: '/api/companies',
                },
                {
                  type: 'relationship',
                  label: 'Арбитражный суд',
                  key: 'АрбитражныйСуд',
                  size: 6,
                  api: '/api/companies',
                },
                {
                  type: 'input',
                  label: 'Госуслуги',
                  key: 'Госуслуги',
                  size: 4,
                  inputType: 'text'
                },
                {
                  type: 'date',
                  label: 'Дата подачи заявления',
                  key: 'ДатаПодачиЗаявления',
                  size: 4,
                  inputType: 'date'
                },
                {
                  type: 'select',
                  label: 'Этап',
                  key: 'Этап',
                  size: 4,
                  getOptions: () => {
                    return enumerations.stages;
                  },
                },
                {
                  type: 'input',
                  label: 'Комментарий',
                  key: 'Комментарий',
                  size: 12,
                  inputType: 'text'
                },

              ]
            },
            {
              type: 'tab',
              header: 'Семья, дети',
              children: [
                {
                  type: 'boolean',
                  label: 'Состоит в браке',
                  key: 'СемейноеПоложение',
                  size: 4,
                },
                {
                  type: 'input',
                  label: 'ФИО супруга (-и)',
                  key: 'Супруг',
                  size: 8,
                  inputType: 'text'
                },
                {
                  type: 'tableComponent',
                  collection: 'Дети',
                  size: 12,
                  columns: [
                    {
                      header: 'ФИО',
                      key: 'ФИО',
                      type: 'text',
                      width: '300px'
                    },
                    {
                      header: 'Пол',
                      key: 'Пол',
                      type: 'select',
                      width: '100px',
                      getOptions: () => {
                        return enumerations.sexes;
                      },
                    },
                    {
                      header: 'Дата рождения',
                      key: 'ДатаРождения',
                      type: 'date',
                      width: '100px'
                    },
                  ]
                }
              ]
            },
            {
              type: 'tab',
              header: 'Банковские счета',
              children: [
                {
                  type: 'tableComponent',
                  collection: 'БанковскиеСчета',
                  size: 12,
                  columns: [
                    {
                      header: 'Вид счета',
                      key: 'ВидСчета',
                      type: 'select',
                      width: '150px',
                      getOptions: () => {
                        return enumerations.bankAccountTypes;
                      },
                    },
                    {
                      header: 'Валюта счета',
                      key: 'ВалютаСчета',
                      type: 'select',
                      width: '150px',
                      getOptions: () => {
                        return enumerations.currencies;
                      },
                    },
                    {
                      header: 'Номер счета',
                      key: 'НомерСчета',
                      type: 'text',
                      width: '200px'
                    },
                    {
                      header: 'Банк',
                      key: 'Банк',
                      type: 'relationship',
                      width: '300px',
                      api: '/api/companies'
                    },
                    {
                      header: 'Остаток',
                      key: 'Остаток',
                      type: 'number',
                      width: '150px',
                      step: "0.01"
                    },
                    {
                      header: 'Дата открытия',
                      key: 'ДатаОткрытия',
                      type: 'date',
                      width: '180px'
                    },
                  ]
                }
              ]
            },
            {
              type: 'tab',
              header: 'Кредиторы',
              children: [
                {
                  type: 'tableComponent',
                  collection: 'Кредиторы',
                  size: 12,
                  columns: [
                    {
                      header: 'Содержание обязательства',
                      key: 'СодержаниеОбязательства',
                      type: 'select',
                      width: '150px',
                      getOptions: () => {
                        return enumerations.liabilityTypes;
                      },
                    },
                    {
                      header: 'Кредитор',
                      key: 'Кредитор',
                      type: 'relationship',
                      width: '300px',
                      api: '/api/companies'
                    },
                    {
                      header: 'Основание возникновения',
                      key: 'ОснованиеВозникновения',
                      type: 'text',
                      width: '300px'
                    },
                    {
                      header: 'Сумма всего',
                      key: 'СуммаВсего',
                      type: 'number',
                      step: "0.01",
                      width: '150px'
                    },
                    {
                      header: 'в т.ч. задолженность',
                      key: 'СуммаЗадолженность',
                      type: 'number',
                      step: "0.01",
                      width: '150px'
                    },
                    {
                      header: 'в т.ч. штрафы, пени',
                      key: 'ШтрафыПени',
                      type: 'number',
                      step: "0.01",
                      width: '150px'
                    },

                  ]
                }
              ]
            },
            {
              type: 'tab',
              header: 'Исполнительные документы',
              children: [
                {
                  type: 'tableComponent',
                  collection: 'ИсполнительныеДокументы',
                  size: 12,
                  columns: [
                    {
                      header: 'Вид документа',
                      key: 'ВидДокумента',
                      type: 'select',
                      width: '150px',
                      getOptions: () => {
                        return enumerations.executiveDocumentTypes;
                      },
                    },
                    {
                      header: 'Дата',
                      key: 'Дата',
                      type: 'date',
                      width: '180px'
                    },
                    {
                      header: 'Номер',
                      key: 'Номер',
                      type: 'text',
                      width: '100px'
                    },
                    {
                      header: 'Исполнитель',
                      key: 'Исполнитель',
                      type: 'text',
                      width: '250px'
                    },
                    {
                      header: 'Содержание',
                      key: 'Содержание',
                      type: 'text',
                      width: '300px'
                    },
                  ]
                }
              ]
            },
            {
              type: 'tab',
              header: 'Обязательные платежи',
              children: [
                {
                  type: 'tableComponent',
                  collection: 'ОбязательныеПлатежи',
                  size: 12,
                  columns: [
                    {
                      header: 'Наименование налога (сбора)',
                      key: 'НаименованиеНалогаСбора',
                      type: 'select',
                      width: '300px',
                      getOptions: () => {
                        return enumerations.taxes;
                      },
                    },
                    {
                      header: 'Недоимка',
                      key: 'Недоимка',
                      type: 'number',
                      step: "0.01",
                      width: '150px'
                    },
                    {
                      header: 'Штрафы, пени',
                      key: 'ШтрафыПени',
                      type: 'number',
                      step: "0.01",
                      width: '150px'
                    },
                  ]
                }
              ]
            },
            {
              type: 'tab',
              header: 'Недвижимое имущество',
              children: [
                {
                  type: 'tableComponentAccordion',
                  collection: 'НедвижимоеИмущество',
                  size: 12,
                  header: 'Наименование',
                  fields: [
                    {
                      type: 'input',
                      label: 'Наименование',
                      key: 'Наименование',
                      inputType: 'text',
                      size: 8
                    },
                    {
                      type: 'select',
                      label: 'Вид имущества',
                      key: 'ВидИмущества',
                      size: 4,
                      getOptions: () => {
                        return enumerations.realtyTypes;
                      },
                    },
                    {
                      type: 'select',
                      label: 'Вид cобственности',
                      key: 'ВидСобственности',
                      size: 4,
                      getOptions: () => {
                        return enumerations.ownshipTypes;
                      },
                    },
                    {
                      type: 'input',
                      label: 'Площадь',
                      key: 'Площадь',
                      inputType: 'number',
                      step: "0.01",
                      size: 2
                    },
                    {
                      type: 'input',
                      label: 'Основание приобретения',
                      key: 'ОснованиеПриобретения',
                      inputType: 'text',
                      size: 6
                    },
                    {
                      type: 'input',
                      label: 'Сведения о залоге',
                      key: 'СведенияОЗалоге',
                      inputType: 'text',
                      size: 6
                    },
                    {
                      type: 'input',
                      label: 'Адрес старый формат',
                      key: 'АдресOld',
                      inputType: 'text',
                      size: 6
                    },
                    {
                      type: 'modalComponent',
                      componentName: 'AddressComponent',
                      key: 'Адрес',
                      size: 12,
                    },
                  ]
                }
              ]
            },
            {
              type: 'tab',
              header: 'Движимое имущество',
              children: [
                {
                  type: 'tableComponentAccordion',
                  collection: 'ДвижимоеИмущество',
                  size: 12,
                  header: 'Наименование',
                  fields: [
                    {
                      type: 'input',
                      label: 'Наименование',
                      key: 'Наименование',
                      inputType: 'text',
                      size: 8
                    },
                    {
                      type: 'select',
                      label: 'Вид транспортного средства',
                      key: 'ВидТС',
                      size: 4,
                      getOptions: () => {
                        return enumerations.autoTypes;
                      },
                    },
                    {
                      type: 'select',
                      label: 'Вид cобственности',
                      key: 'ВидСобственности',
                      size: 4,
                      getOptions: () => {
                        return enumerations.ownshipTypes;
                      },
                    },
                    {
                      type: 'input',
                      label: 'Стоимость',
                      key: 'Стоимость',
                      inputType: 'number',
                      step: "0.01",
                      size: 2
                    },
                    {
                      type: 'input',
                      label: 'Год выпуска',
                      key: 'ГодВыпуска',
                      inputType: 'text',
                      size: 2
                    },
                    {
                      type: 'input',
                      label: 'Идентификационный номер',
                      key: 'ИдентификационныйНомер',
                      inputType: 'text',
                      size: 4
                    },
                    {
                      type: 'input',
                      label: 'Сведения о залоге',
                      key: 'СведенияОЗалоге',
                      inputType: 'text',
                      size: 4
                    },
                    {
                      type: 'input',
                      label: 'Адрес старый формат',
                      key: 'АдресOld',
                      inputType: 'text',
                      size: 8
                    },
                    {
                      type: 'modalComponent',
                      componentName: 'AddressComponent',
                      key: 'Адрес',
                      size: 12,
                    },
                  ]
                }
              ]
            },
            {
              type: 'tab',
              header: 'Сделки',
              children: [
                {
                  type: 'tableComponent',
                  collection: 'Сделки',
                  size: 12,
                  columns: [
                    {
                      header: 'Дата',
                      key: 'Дата',
                      type: 'date',
                      width: '180px'
                    },
                    {
                      header: 'Имущество',
                      key: 'Имущество',
                      type: 'select',
                      width: '300px',
                      getOptions: (data) => {
                        const realty = data.НедвижимоеИмущество.map(item =>
                          ({ view: item.Наименование, value: `dealable_type:App\\Models\\ClientRealty|dealable_id:${item.id}` })
                        );
                        const auto = data.ДвижимоеИмущество.map(item =>
                          ({ view: item.Наименование, value: `dealable_type:App\\Models\\ClientAuto|dealable_id:${item.id}` })
                        );
                        return realty.concat(auto);
                      },
                    },
                    {
                      header: 'Вид сделки',
                      key: 'ВидСделки',
                      type: 'select',
                      width: '300px',
                      getOptions: () => {
                        return enumerations.dealTypes;
                      },
                    },
                    {
                      header: 'Основание',
                      key: 'Основание',
                      type: 'text',
                      width: '300px'
                    },
                    {
                      header: 'Сумма',
                      key: 'Сумма',
                      type: 'number',
                      step: "0.01",
                      width: '150px'
                    },
                  ]
                }
              ]
            },
            {
              type: 'tab',
              header: 'Приложения',
              children: [
                {
                  type: 'tableComponent',
                  collection: 'Приложения',
                  size: 12,
                  columns: [
                    {
                      header: 'Раздел',
                      key: 'Раздел',
                      type: 'select',
                      width: '100px',
                      getOptions: () => {
                        return attachmentSection.data.map(item =>
                          ({ view: item.Наименование, value: item.id })
                        )
                      },
                      onChangeHandler: (data, rowIndex, sectionId) => {
                        const val = attachmentSection.data.find(el => el.id === sectionId);
                        dispatch(changeCollectionData(tabId, 'Приложения', rowIndex, 'Наименование', val.ТекстПриложения));
                      }
                    },
                    {
                      header: 'Наименование',
                      key: 'Наименование',
                      type: 'textarea',
                      width: '300px'
                    },
                  ]
                }
              ]
            },
          ]
        }
      ])
    }
  }, [attachmentSection])

  const printOptions =
    data
      ?
      [
        { label: 'Заявление', url: `/print/clients/${data.id}/application` },
        { label: 'Список кредиторов и должников', url: `/print/clients/${data.id}/creditorsList` },
        { label: 'Опись имущества', url: `/print/clients/${data.id}/propertyList` },
      ]
      :
      [];

  const getExportData = () => {
    const getCity = (address) => {
      return address.регион.viewName.toLowerCase().includes('москва') ? address.регион.viewName : address.город.viewName + address.населенныйПункт.viewName;
    };
    const exportData = {
      Истец: {
        INN: data.ИНН,
        Snils: data.СНИЛС,
        LastName: data.Фамилия,
        FirstName: data.Имя,
        MiddleName: data.Отчество,
        DocumentType: 'паспорт РФ',
        DocumentInfo: `${data.Паспорт.Серия}, ${data.Паспорт.Номер}`,
        BirthDate: localeDate(data.ДатаРождения),
        BirthCity: data.МестоРождения,
        "Addresses.1.Country": 'Российская Федерация',
        "Addresses.1.Region": data.Адрес.регион.viewName,
        "Addresses.1.City": getCity(data.Адрес),
        "Addresses.1.District": data.Адрес.район.viewName,
        "Addresses.1.Street": data.Адрес.улица.viewName,
        "Addresses.1.House": data.Адрес.дом.viewName,
        "Addresses.1.Corps": data.Адрес.корпус,
        "Addresses.1.Office": data.Адрес.квартира,
        "Addresses.1.ZipCode": data.Адрес.индекс,
        "Addresses.0.Country": 'Российская Федерация',
        "Addresses.0.Region": data.Адрес.регион.viewName,
        "Addresses.0.City": getCity(data.Адрес),
        "Addresses.0.District": data.Адрес.район.viewName,
        "Addresses.0.Street": data.Адрес.улица.viewName,
        "Addresses.0.House": data.Адрес.дом.viewName,
        "Addresses.0.Corps": data.Адрес.корпус,
        "Addresses.0.Office": data.Адрес.квартира,
        "Addresses.0.ZipCode": data.Адрес.индекс,
        Phone2: data.Телефон,
        EMail: 'slava_ykt@mail.ru'
      },
      НедвижимоеИмущество: data.НедвижимоеИмущество.map(el => (
        {
          "index.RealtyType": el.ВидИмущества,
          "index.OwnerShip": el.ВидСобственности,
          "index.NameObject": el.Наименование,
          "index.Area": String(el.Площадь),
          "index.BasisOfAcquisition": el.ОснованиеПриобретения,
          "index.InformationOnPledge": el.СведенияОЗалоге,
          "index.Address.Country": 'Российская Федерация',
          "index.Address.Region": el.Адрес.регион.viewName,
          "index.Address.District": el.Адрес.район.viewName,
          "index.Address.City": getCity(el.Адрес),
          "index.Address.Street": el.Адрес.улица.viewName,
          "index.Address.House": el.Адрес.дом.viewName,
          "index.Address.Corps": el.Адрес.корпус,
          "index.Address.Office": el.Адрес.квартира,
          "index.Address.ZipCode": el.Адрес.индекс,
        }
      )),
      ДвижимоеИмущество: data.ДвижимоеИмущество.map(el => (
        {
          "index.AutoType": el.ВидТС,
          "index.OwnerShip": el.ВидСобственности,
          "index.Model": el.Наименование,
          "index.Number": el.ИдентификационныйНомер,
          "index.Year": el.ГодВыпуска,
          "index.Cost": String(el.Стоимость),
          "index.InformationOnPledge": el.СведенияОЗалоге,
          "index.Address.Country": 'Российская Федерация',
          "index.Address.Region": el.Адрес.регион.viewName,
          "index.Address.District": el.Адрес.район.viewName,
          "index.Address.City": getCity(el.Адрес),
          "index.Address.Street": el.Адрес.улица.viewName,
          "index.Address.House": el.Адрес.дом.viewName,
          "index.Address.Corps": el.Адрес.корпус,
          "index.Address.Office": el.Адрес.квартира,
          "index.Address.ZipCode": el.Адрес.индекс,
        }
      )),
      БанковскиеСчета: data.БанковскиеСчета.map(el => (
        {
          "index.BankName": el.Банк.Наименование,
          "index.ScoreType": el.ВидСчета,
          "index.Currency": el.ВалютаСчета,
          "index.OpenDate": localeDate(el.ДатаОткрытия),
          "index.Balance": String(el.Остаток),
          "index.Address.Country": 'Российская Федерация',
          "index.Address.Region": el.Банк.Адрес.регион.viewName,
          "index.Address.District": el.Банк.Адрес.район.viewName,
          "index.Address.City": getCity(el.Банк.Адрес),
          "index.Address.Street": el.Банк.Адрес.улица.viewName,
          "index.Address.House": el.Банк.Адрес.дом.viewName,
          "index.Address.Corps": el.Банк.Адрес.корпус,
          "index.Address.Office": el.Банк.Адрес.квартира,
          "index.Address.ZipCode": el.Банк.Адрес.индекс,
        }
      )),
      Кредиторы: data.Кредиторы.reduce((result, el) => {
        if (el.СодержаниеОбязательства === 'налог') {
          return result
        }
        if (!result[el.Кредитор.Наименование]) {
          result[el.Кредитор.Наименование] = [];
        }
        result[el.Кредитор.Наименование].push(
          {
            "PersonType": "Коммерческая организация",
            "INN": el.Кредитор.ИНН,
            "FIO": el.Кредитор.Наименование,
            "LiabilitiesSum.index.ContentLiabilities": el.СодержаниеОбязательства,
            "LiabilitiesSum.index.BasisOfOrigin": el.ОснованиеВозникновения,
            "LiabilitiesSum.index.Sum": String(el.СуммаВсего),
            "LiabilitiesSum.index.Debt": String(el.СуммаЗадолженность),
            "LiabilitiesSum.index.Fine": String(el.ШтрафыПени),
            "Address.Country": 'Российская Федерация',
            "Address.Region": el.Кредитор.Адрес.регион.viewName,
            "Address.District": el.Кредитор.Адрес.район.viewName,
            "Address.City": getCity(el.Кредитор.Адрес),
            "Address.Street": el.Кредитор.Адрес.улица.viewName,
            "Address.House": el.Кредитор.Адрес.дом.viewName,
            "Address.Corps": el.Кредитор.Адрес.корпус,
            "Address.Office": el.Кредитор.Адрес.квартира,
            "Address.ZipCode": el.Кредитор.Адрес.индекс,
          }
        );
        return result
      }, {})
    };
    exportData.БанковскиеСчета = Object.fromEntries(exportData.БанковскиеСчета.map((el, i) => ([i, el])));
    exportData.НедвижимоеИмущество = Object.fromEntries(exportData.НедвижимоеИмущество.map((el, i) => ([i, el])));
    exportData.ДвижимоеИмущество = Object.fromEntries(exportData.ДвижимоеИмущество.map((el, i) => ([i, el])));
    Object.keys(exportData.Кредиторы).map(key => {
      exportData.Кредиторы[key] = Object.fromEntries(exportData.Кредиторы[key].map((el, i) => ([i, el])))
    });
    return exportData;
  }

  const handleExport = () => {

    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(getExportData())], { type: 'application/json' });
    a.href = URL.createObjectURL(file);
    a.download = `${data.Фамилия}.json`;
    a.click();
  }

  return (
    <TabContext.Provider value={{ ...tabContext, sourceTabId }}>
      <div className={classes.buttonGroup}>
        <StandardEditButtons
          tabId={tabId}
          refetchHandler={() => refetch()}
          setSaving={setSaving}
          api="api/clients"
          deleteTitle={`Все данные клиента ${data ? data.Наименование : ""} будут полностью удалены. Вы уверены?`}
        />
        <PrintButton options={printOptions} />
        <ExtendableButton
          variant="contained"
          startIcon={<ImportExport color="primary" />}
          onClick={handleExport}
        >
          <Typography variant="body2">Выгрузить в Arbitr.ru</Typography>
        </ExtendableButton>
      </div>
      {(saving || loading || loadingAttachments) && <LinearProgress />}
      {(attachmentSection && data) &&
        <EditForm
          layout={layout} />
      }

    </TabContext.Provider>
  )

}

export default ClientEdit;