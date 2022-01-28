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

export default notification;