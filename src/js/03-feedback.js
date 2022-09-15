
import Throttle from 'lodash.throttle';
// ** находим ссылки на необходимые поля ввода данных
const form = document.querySelector('.feedback-form');
const email = form.querySelector('[name="email"]');
const message = form.querySelector('[name="message"]');
// **создаем переменную для хранения длинного ключа
// убираем магические стили и строки
const STORAGE_KEY = 'feedback-form-state';
// **создаем ссылки на наши импуты и форму
form.addEventListener('input', Throttle(storageFormData, 500));
form.addEventListener('submit', onFormSubmit);
// сохраняет написаное в хранилище
window.addEventListener('load', checkStorage);
function checkStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) return;
  const formValue = JSON.parse(localStorage.getItem(STORAGE_KEY));
  for (const key in formValue) {
    form.elements[key].value = formValue[key];
  }
}
// **функция отправки
function onFormSubmit(e) {
  e.preventDefault();
  // // второй способ достать данные
  // const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  // console.dir(savedData);
  const { email, message } = e.currentTarget.elements;
  console.dir({ email: email.value, message: message.value });
  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
}
// //** фукнция хранения данных в хранилище
function storageFormData(e) {
  // создали обьект в корый будем записывать данные формы
  const formValue = { email: '', message: '' };
  // если в нашем обьекте что то есть то добавь новые к существующим
  // что б не затирались данные когда вводим в другом поле
  if (localStorage.getItem(STORAGE_KEY)) {
    Object.assign(formValue, JSON.parse(localStorage.getItem(STORAGE_KEY)));
  }
  formValue[e.target.name] = e.target.value.trim();
  // создаем локальное хранилище записываем данные приводимые к строке
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formValue));
  console.log(formValue);
}