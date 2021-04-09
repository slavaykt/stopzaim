import { ADD_TAB, CLOSE_TAB, SET_ACTIVE_TAB, CHANGE_DATA, CHANGE_FOLDER, DELETE_ROW, ADD_ROW, CHANGE_COLLECTION_DATA, ADD_COLLECTION_ROW, DELETE_COLLECTION_ROW, REORDER_TABLE, SET_ACTIVE_ROW, INSERT_COLLECTION_ROW, REFETCH_TAB, SET_DRAWER_OPEN } from './../actions/ActionTypes';

const initialState = {
  activeTab: -1,
  tabs: [],
  drawerOpen: true,
  getTab(id) {
    return this.tabs.find(tab => tab.id === id)
  },
  getTabIndex(id) {
    return this.tabs.findIndex(tab => tab.id === id)
  }
};
export const appReducer = (state = initialState, action) => {
  let tabs = [...state.tabs];
  let activeTab = state.activeTab;
  const tabIndex = state.getTabIndex(action.tabId);
  let activeTabIndex = state.getTabIndex(state.activeTab);
  switch (action.type) {
    case ADD_TAB:
      activeTab = action.tab.id;
      return { ...state, tabs: state.tabs.concat(action.tab), activeTab };
    case REFETCH_TAB:
      tabs[tabIndex].data = action.data;
      return { ...state, tabs };
    case CLOSE_TAB:
      if (action.tabId === activeTab) {
        if (tabIndex === 0) {
          if (state.tabs.length > 1) {
            activeTab = state.tabs[tabIndex + 1].id;
          } else {
            activeTab = -1;
          }
        } else {
          activeTab = state.tabs[tabIndex - 1].id;
        }
      }
      tabs.splice(tabIndex, 1);
      return { ...state, tabs, activeTab };
    case SET_ACTIVE_TAB:
      activeTab = action.tabId;
      return { ...state, activeTab };
    case SET_DRAWER_OPEN:
      return { ...state, drawerOpen: action.value };
    case SET_ACTIVE_ROW:
      if (action.clear) {
        tabs[tabIndex].data.forEach(el => {
          el.isActive = false;
        })
      }
      tabs[tabIndex].data[action.rowIndex].isActive = true;
      return { ...state, tabs };
    case CHANGE_DATA:
      tabs[tabIndex].data[action.key] = action.value;
      return { ...state, tabs };
    case CHANGE_COLLECTION_DATA:
      tabs[tabIndex].data[action.collection][action.index][action.key] = action.value;
      return { ...state, tabs };
    case ADD_COLLECTION_ROW:
      tabs[tabIndex].data[action.collection].push(action.row);
      return { ...state, tabs };
    case INSERT_COLLECTION_ROW:
      tabs[tabIndex].data[action.collection].splice(action.rowIndex, 0, action.row);
      return { ...state, tabs };
    case DELETE_COLLECTION_ROW:
      tabs[tabIndex].data[action.collection].splice(action.rowIndex, 1);
      return { ...state, tabs };
    case CHANGE_FOLDER:
      tabs[tabIndex].data.forEach(row => {
        if (action.row_ids.includes(row.id)) {
          row.parent_id = action.parent_id;
        }
      });
      return { ...state, tabs };
    case DELETE_ROW:
      //tabs = tabs.map(tab => tab.id === action.tabId ? tab.data.filter(row => !action.row_ids.includes(row.id)) : tab);
      tabs[tabIndex].data = tabs[tabIndex].data.filter(row => !action.row_ids.includes(row.id));
      return { ...state, tabs };
    case ADD_ROW:
      tabs[tabIndex].data.push(action.row);
      tabs[tabIndex].data.sort((prev, next) => next.isGroup - prev.isGroup);
      return { ...state, tabs };
    case REORDER_TABLE:
      tabs[tabIndex].data.data = tabs[tabIndex].data.data.map(row => {
        if (action.begin > action.end) {
          if (row.Порядок >= action.end && row.Порядок < action.begin) {
            return { ...row, Порядок: row.Порядок + 1 }
          } else if (row.Порядок === action.begin) {
            return { ...row, Порядок: action.end }
          } else {
            return row;
          }
        } else if (action.begin < action.end) {
          if (row.Порядок > action.begin && row.Порядок <= action.end) {
            return { ...row, Порядок: row.Порядок - 1 }
          } else if (row.Порядок === action.begin) {
            return { ...row, Порядок: action.end }
          } else {
            return row;
          }
        }

      });
      return { ...state, tabs };
    default: return state

  }
}
