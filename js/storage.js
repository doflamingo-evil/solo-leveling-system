const STORAGE_KEY = "solo-leveling-data";

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

function clearData() {
  localStorage.removeItem(STORAGE_KEY);
}
