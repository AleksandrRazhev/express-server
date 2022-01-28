'use strict';

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

export default ShowDataCard;