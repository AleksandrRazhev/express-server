'use strict';
import ShowDataCard from './modules/show_data_card';
import responsePOST from './modules/response_post';
import checkInputsForm from './modules/check_inputs_form';
import notification from './modules/notification';

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
