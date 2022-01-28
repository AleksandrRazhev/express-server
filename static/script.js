'use strict';

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

class ShowDataCard {
  constructor({urlGet, btnClass, parentClass, blockName, wrapper, outputKeys}){
    this.urlGet = urlGet;
    this.btnClass = btnClass;
    this.parentClass = parentClass;
    this.blockName = blockName;
    this.wrapper = wrapper;
    this.outputKeys = outputKeys;
  }
  checkContentParent(parentClass, blockName, wrapper) {
    const parent = document.querySelector(`.${parentClass}`);
    const content = parent.querySelectorAll(`.${blockName}__${wrapper}`);
    if (content) {
      content.forEach(item => {
        item.remove();
      });
    }
  }
  createDomElement(parentSelector, tag, classNameArr) {
    const parentElem = document.querySelector(`.${parentSelector}`);
    const elem = document.createElement(tag);
    classNameArr.forEach(item => {
      elem.classList.add(item);
    });
    parentElem.append(elem);
      return elem;
  }
  cardGenerator(data, parent, blockName, wrapper, output) {
    this.createDomElement(parent, 'div', [`${blockName}__${wrapper}`, `${wrapper}`]);
    data.forEach(item => {
      const list = this.createDomElement(`${blockName}__${wrapper}`, 'ul', ['card']);
      output.forEach(value => {
        const elem = document.createElement('li');
        elem.textContent = item[value];
        list.append(elem);
      });
    });
    return data;
  }
  init() {
    document.querySelector(`.${this.btnClass}`).addEventListener('click', e => {
      e.preventDefault();

      this.checkContentParent(this.parentClass, this.blockName, this.wrapper);
  
      fetch(this.urlGet)
      .then(data => data.json())
      .then(data => this.cardGenerator(data, this.parentClass, this.blockName, this.wrapper, this.outputKeys))
      .then(data => console.log(data))
      .catch(error => console.log(error))
      .finally(() => console.log('fetch get end'));
    });
  }
} 

document.addEventListener('DOMContentLoaded', () => {

  const getsShow = new ShowDataCard ({
    urlGet: '/api/data/',
    btnClass: 'data__link',
    parentClass: 'data__container',
    blockName: 'data',
    wrapper: 'wrapper',
    outputKeys: ['name', 'phone'],
  }).init();

  const postsShow = new ShowDataCard ({
    urlGet: '/api/posts/',
    btnClass: 'posts__link',
    parentClass: 'posts__container',
    blockName: 'posts',
    wrapper: 'wrapper',
    outputKeys: ['id', 'name', 'message'],
  }).init();

  responsePOST('.form-post');

});
