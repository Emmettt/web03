export default function contactClick(contactID) {
  return {
    type: 'CONTACT_CLICK_EVENT',
    payload: contactID
  };
}
