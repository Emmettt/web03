import CLIENTS from '../db/clients';

const initialState = {
  clients: CLIENTS,
  contactID: '',
  searchQuery: ''
};

export default function inputEvent(state = initialState, action) {
  switch (action.type) {
    case 'INPUT_EVENT':
      return { ...state, searchQuery: action.payload };
    case 'CONTACT_CLICK_EVENT':
      return { ...state, contactID: action.payload };

    default:
      return state;
  }
}
