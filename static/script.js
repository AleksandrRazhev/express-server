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

fetch('/data/')
.then(data => data.json())
.then(data => {
  const wrapper = 'wrapper';
  createWrapper('body', wrapper);
  data.forEach(item => createElement(item, wrapper));
  return data;
})
.then(data => console.log(data));

