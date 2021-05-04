import React, { useContext, useEffect, useState } from 'react';
import useAxios from "axios-hooks";
import EditForm from './EditForm';
import { useDispatch, useSelector } from 'react-redux';
import { changeCollectionData, setLayout } from '../../redux/actions/actions';
import { TabContext } from '../context';
import CircularProgress from '@material-ui/core/CircularProgress';

const ClientEdit = () => {

  const dispatch = useDispatch();
  const tabContext = useContext(TabContext);
  const { tabId } = tabContext;
  const { data, sourceTabId } = useSelector(state => state.app.getTab(tabId));
  const enumerations = useSelector(state => state.config.enumerations);
  const [{ data: attachmentSection, loading, error }, refetch] = useAxios(
    "api/attachment/sections"
  );
  const [layout, setLayout] = useState([]);

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
                      label: 'Адрес',
                      key: 'Адрес',
                      inputType: 'text',
                      size: 6
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
                      label: 'Адрес',
                      key: 'Адрес',
                      inputType: 'text',
                      size: 8
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
    !data
      ?
      []
      :
      [
        { label: 'Заявление', url: `/print/clients/${data.id}/application` },
        { label: 'Список кредиторов и должников', url: `/print/clients/${data.id}/creditorsList` },
        { label: 'Опись имущества', url: `/print/clients/${data.id}/propertyList` },
      ];


  if (loading) {
    return <CircularProgress />
  } else {
    return (
      <TabContext.Provider value={{ ...tabContext, sourceTabId }}>
        <EditForm
          layout={layout}
          printOptions={printOptions}
          api="api/clients" />
      </TabContext.Provider>
    )
  }

}

export default ClientEdit;