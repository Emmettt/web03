export default function inputAction(searchQuery) {
  return {
    type: 'INPUT_EVENT',
    payload: searchQuery
  };
}
