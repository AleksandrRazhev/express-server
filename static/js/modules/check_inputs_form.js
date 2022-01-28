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

export default checkInputsForm;