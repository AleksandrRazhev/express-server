'use strict';

function createWrapper(parent, className) {
  const parentElem = document.querySelector(parent);
  const elem = document.createElement('div');
  elem.classList.add(className);
  parentElem.append(elem);
}

function createElement(data, wrapperSelector) {
  const wrapper = document.querySelector(`.${wrapperSelector}`);
  const list = document.createElement('ul');
  list.classList.add('card');
  wrapper.append(list);
  const output = ['name', 'phone'];
  output.forEach(item => {
    const elem = document.createElement('li');
    elem.textContent = data[item];
    list.append(elem);
  });
}

function checkInputsForm(inputList) {
  let check = true;
  inputList.forEach(item => {
    if (item.value === '') {
      item.classList.add('js-warning');
      item.placeholder = 'form is not fill!!!';
      check = false;
    }
  });
  return check;
}

function notification(elem) {
  const parent = document.querySelector(elem);
  const children = document.querySelectorAll(`${elem} *`);
  const notification = document.createElement('p');
  notification.textContent = 'Данные переданы на сервер';
  parent.append(notification);
  children.forEach(item => {
    item.classList.add('js-hide');
  });
  setTimeout(() => {
    notification.remove();
    children.forEach(item => {
      item.classList.remove('js-hide');
      parent.reset();
    });
  }, 1000);
}

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

document.addEventListener('DOMContentLoaded', () => {

  document.querySelector('.data__link').addEventListener('click', e => {
    e.preventDefault();
    const parentNode = e.target.parentNode;

    fetch('/api/data/')
    .then(data => data.json())
    .then(data => {
      const wrapper = 'wrapper';
      createWrapper('.data__container', wrapper);
      data.forEach(item => createElement(item, wrapper));
      return data;
    })
    .then(data => console.log(data))
    .catch(error => console.log(error))
    .finally(() => console.log('fetch get end'));
  });

  responsePOST('.form-post');

});
