'use strict';
import '../styles/index.scss';

import ShowDataCard from './modules/show_data_card.js';
import responsePOST from './modules/response_post.js';
import checkInputsForm from './modules/check_inputs_form.js';
import notification from './modules/notification.js';

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
