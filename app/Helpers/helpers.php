<?php

if (!function_exists('transform_address')) {
  function transform_address($request)
  {
    return [
      'id' => $request['id'],
      'Регион' => $request['регион']['viewName'],
      'РегионПоиск' => $request['регион']['searchName'],
      'Район' => $request['район']['viewName'],
      'РайонПоиск' => $request['район']['searchName'],
      'Город' => $request['город']['viewName'],
      'ГородПоиск' => $request['город']['searchName'],
      'НаселенныйПункт' => $request['населенныйПункт']['viewName'],
      'НаселенныйПунктПоиск' => $request['населенныйПункт']['searchName'],
      'Улица' => $request['улица']['viewName'],
      'УлицаПоиск' => $request['улица']['searchName'],
      'Дом' => $request['дом']['viewName'],
      'ДомПоиск' => $request['дом']['searchName'],
      'Корпус' => $request['корпус'],
      'Квартира' => $request['квартира'],
      'Индекс' => $request['индекс'],
    ];
  }
}
