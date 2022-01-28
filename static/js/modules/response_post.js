'use strict';
import checkInputsForm from './check_inputs_form.js';
import notification from './notification.js';

function responsePOST(elem) {
  const form = document.querySelector(elem);
  const inputList = form.querySelectorAll('input');
  const textHolderArr = [];
  inputList.forEach(item => {
    textHolderArr.push(item.placeholder);
  });
  form.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.tagName === 'BUTTON') {
      if (checkInputsForm(inputList)) {
        const formData = new FormData(form);
        const body = {};

        formData.forEach((item, i) => {
          body[i] = item;
        });

        fetch('/api/post/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(body)
        })
        .then(data => data.json())
        .then(data => console.log(data))
        .then(() => {
          inputList.forEach((item, i) => {
            item.classList.remove('js-warning');
            item.placeholder = textHolderArr[i];
          });
        })
        .then(() => notification(elem))
        .catch(error => console.log(error))
        .finally(() => console.log('fetch post end'));
      }
    }
  });
}

export default responsePOST;