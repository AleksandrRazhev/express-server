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
  const input = form.querySelector('input');
  const textHolder = input.placeholder;
  form.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.tagName === 'BUTTON') {
      if (input.value !== '') {



        const formData = new FormData(form);
        const body = {};

        formData.forEach((value, key) => {
          body[key] = value;
        });

        fetch('/api/post/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(body)
        })
        .then(data => data.json())
        .then(data => console.log(data));



        input.classList.remove('js-warning');
        input.placeholder = textHolder;
        notification(elem);
      } else {
        input.classList.add('js-warning');
        input.placeholder = 'form is not fill!!!';
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
