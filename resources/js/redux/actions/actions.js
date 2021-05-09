import Axios from 'axios';
import { ADD_COLLECTION_ROW, ADD_TAB, CLOSE_TAB, ADD_ROW, CHANGE_COLLECTION_DATA, CHANGE_DATA, CHANGE_FOLDER, DELETE_COLLECTION_ROW, DELETE_ROW, INSERT_COLLECTION_ROW, LOAD_CONFIG, REORDER_TABLE, SET_ACTIVE_ROW, SET_ACTIVE_TAB, REFETCH_TAB, SET_DRAWER_OPEN, LOAD_DATA, CHANGE_INDEX_DATA, SET_ERROR } from './ActionTypes';
import { v4 as uuidv4 } from 'uuid';

export const addTab = (label, api, componentName, sourceTabId) => {
  const id = uuidv4();
  return (
    {
      type: ADD_TAB,
      tab: { id, label, componentName, api, sourceTabId }
    }
  )
}

export const loadData = (tabId, data) => {
  const id = uuidv4();
  return (
    {
      type: LOAD_DATA,
      tabId, data
    }
  )
}


export const refetchTab = (tab) => {
  return async dispatch => {
    const response = await Axios.get(tab.api);
    const data = await response.data;
    dispatch(
      {
        type: REFETCH_TAB,
        tabId: tab.id,
        data
      }
    )
  }
}

export const closeTab = (tabId) => {
  return (
    {
      type: CLOSE_TAB,
      tabId
    }
  )
}

export const setDrawerOpen = (value) => {
  return (
    {
      type: SET_DRAWER_OPEN,
      value
    }
  )
}

export const setActiveTab = (tabId) => {
  return (
    {
      type: SET_ACTIVE_TAB,
      tabId
    }
  )
}

export const setActiveRow = (tabId, rowIndex, clear) => {
  return (
    {
      type: SET_ACTIVE_ROW,
      tabId, rowIndex, clear
    }
  )
}

export const changeData = (tabId, key, value) => {
  return (
    {
      type: CHANGE_DATA,
      tabId, key, value
    }
  )
}

export const changeCollectionData = (tabId, collection, index, key, value) => {
  return (
    {
      type: CHANGE_COLLECTION_DATA,
      tabId, collection, index, key, value
    }
  )
}

export const addCollectionRow = (tabId, collection, row) => {
  return (
    {
      type: ADD_COLLECTION_ROW,
      tabId, collection, row
    }
  )
}

export const insertCollectionRow = (tabId, collection, row, rowIndex) => {
  return (
    {
      type: INSERT_COLLECTION_ROW,
      tabId, collection, row, rowIndex
    }
  )
}

export const deleteCollectionRow = (tabId, collection, rowIndex) => {
  return (
    {
      type: DELETE_COLLECTION_ROW,
      tabId, collection, rowIndex
    }
  )
}

export const changeFolder = (tabId, api, row_ids, parent_id) => {
  return async dispatch => {
    const response = await Axios.put(`${api}/${row_ids.join(',')}`, { parent_id, row_ids })
    if (response.status === 200) {
      dispatch(
        {
          type: CHANGE_FOLDER,
          tabId, row_ids, parent_id
        }
      )
    }
  }
}

export const deleteRow = (tabId, api, tabApi, row_ids) => {
  return async dispatch => {
    const response = await Axios.delete(api + '/' + row_ids.join());
    if (response.status === 204) {
      dispatch(
        {
          type: DELETE_ROW,
          tabId, row_ids
        }
      )
      const res = await Axios.get(tabApi);
      const data = await res.data;
      dispatch(
        {
          type: REFETCH_TAB,
          tabId,
          data
        }
      )
    }
  }
}

export const addRow = (tabId, api, row) => {
  return async dispatch => {
    const response = await Axios.post(api, row)
    if (response.status === 201) {
      dispatch(
        {
          type: ADD_ROW,
          tabId,
          row: { ...row, id: response.data.id }
        }
      );
    }
  }
}

export const deleteRecord = (tabId, api, id) => {
  return async dispatch => {
    const response = await Axios.delete(api + '/' + id)
    if (response.status === 204) {
      dispatch(
        {
          type: CLOSE_TAB,
          tabId
        }
      );
    }
  }
}

export const reorderTable = (tabId, begin, end) => {
  return (
    {
      type: REORDER_TABLE,
      tabId, begin, end
    }
  )
}

export const loadConfig = () => {
  return async dispatch => {
    const response = await Axios.get('/api/config')
    if (response.status === 200) {
      dispatch(
        {
          type: LOAD_CONFIG,
          payload: response.data
        }
      );
    }
  }
}

export const handleRegister = (tabId, api, data, tabType, registered) => {
  return async dispatch => {
    const response = data.id ? await Axios.put(api + '/' + String(data.id), { ...data, registered: registered }) : await Axios.post(api, { ...data, registered: registered });
    if (response.status === 200 || response.status === 201) {
      if (tabType === 'edit') {
        dispatch(
          {
            type: CHANGE_DATA,
            tabId,
            key: 'registered',
            value: registered
          }
        )
      } else if (tabType === 'index') {

        dispatch(
          {
            type: CHANGE_INDEX_DATA,
            tabId,
            id: data.id,
            docType: data.ВидДокумента,
            key: 'registered',
            value: registered
          }
        )
      }
    }
  }
}

export const setError = (tabId, error) => {
  return (
    {
      type: SET_ERROR,
      tabId, error
    }
  )
}