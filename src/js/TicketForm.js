/**
 *  Класс для создания формы создания нового тикета
 * */

// Пока пустой закоментирую

// export default class TicketForm { // Работает, но хочу менять название ('добавить тикет' на 'изменить тикет')
//   form() {
//     const body = document.querySelector('body');
//     const modal = document.createElement('div');
//     modal.insertAdjacentHTML('afterbegin', '<div class="title">Добавить тикет</div>');
//     modal.classList.add('modal-add');
//     body.appendChild(modal);

//     const modalAdd = document.querySelector('.modal-add');

//     const divForm = document.createElement('div');
//     divForm.classList.add('div-form');
//     const formAdd = document.createElement('form');
//     formAdd.classList.add('form');

//     const divButton = document.createElement('div');
//     divButton.classList.add('div-button');
//     divButton.insertAdjacentHTML('afterbegin', '<button class="btn-ok">Ok</button>');
//     divButton.insertAdjacentHTML('afterbegin', '<button class="btn-cancel">Отмена</button>');
//     formAdd.appendChild(divButton);
//     formAdd.insertAdjacentHTML('afterbegin', '<input type="text" class="dd" name="name" /><br />');
//     formAdd.insertAdjacentHTML('afterbegin', '<label for="d">Подробное описание</label><br />');
//     formAdd.insertAdjacentHTML('afterbegin', '<input type="text" class="d" name="name" /><br />');
//     formAdd.insertAdjacentHTML('afterbegin', '<label for="d">Краткое описание</label><br />');
//     divForm.appendChild(formAdd);

//     modalAdd.appendChild(divForm);
//   }
// }

export default class TicketForm {
  form(title) {
    const body = document.querySelector('body');
    const modal = document.createElement('div');
    // modal.insertAdjacentHTML('afterbegin', '<div class="title">Добавить тикет</div>');
    const divTitle = document.createElement('div');
    divTitle.classList.add('modal-title');
    divTitle.textContent = title; // 'Добавить тикет';
    modal.appendChild(divTitle);

    if (title === 'Добавить тикет') {
      modal.classList.add('modal-add');
      body.appendChild(modal);

      const modalAdd = document.querySelector('.modal-add');

      const divForm = document.createElement('div');
      divForm.classList.add('div-form');
      const formAdd = document.createElement('form');
      formAdd.classList.add('form');

      const divButton = document.createElement('div');
      divButton.classList.add('div-button');
      divButton.insertAdjacentHTML('afterbegin', '<button class="btn-ok">Ok</button>');
      divButton.insertAdjacentHTML('afterbegin', '<button class="btn-cancel">Отмена</button>');
      formAdd.appendChild(divButton);
      // formAdd.insertAdjacentHTML('afterbegin', '<input type="text" class="dd" name="name" /><br />');
      const inputDd = document.createElement('input');
      inputDd.type = 'text';
      inputDd.id = 'dd';
      inputDd.name = 'dd';
      inputDd.classList.add('dd');
      inputDd.value = 'Подробное описание тикета(description)';
      formAdd.prepend(inputDd);

      formAdd.insertAdjacentHTML('afterbegin', '<label for="dd">Подробное описание</label><br />');
      // formAdd.insertAdjacentHTML('afterbegin', '<input type="text" class="d" name="name" /><br />');
      const inputD = document.createElement('input');
      inputD.type = 'text';
      inputD.id = 'd';
      inputD.name = 'd';
      inputD.classList.add('d');
      inputD.value = 'Краткое описание тикета(name)';
      formAdd.prepend(inputD);

      formAdd.insertAdjacentHTML('afterbegin', '<label for="d">Краткое описание</label><br />');
      divForm.appendChild(formAdd);

      modalAdd.appendChild(divForm);
    } else if (title === 'Изменить тикет') {
      modal.classList.add('modal-edit'); // console.log(modal);
      body.appendChild(modal);

      const modalEdit = document.querySelector('.modal-edit');
      const divForm = document.createElement('div');
      divForm.classList.add('div-form');
      const formAdd = document.createElement('form');
      formAdd.classList.add('form');

      const divButton = document.createElement('div');
      divButton.classList.add('div-button');
      divButton.insertAdjacentHTML('afterbegin', '<button class="btn-ok">Ok</button>');
      divButton.insertAdjacentHTML('afterbegin', '<button class="btn-cancel">Отмена</button>');
      formAdd.appendChild(divButton);
      formAdd.insertAdjacentHTML('afterbegin', '<input type="text" class="dd" name="name" /><br />');
      formAdd.insertAdjacentHTML('afterbegin', '<label for="d">Подробное описание</label><br />');
      formAdd.insertAdjacentHTML('afterbegin', '<input type="text" class="d" name="name" /><br />');
      formAdd.insertAdjacentHTML('afterbegin', '<label for="d">Краткое описание</label><br />');
      divForm.appendChild(formAdd);

      modalEdit.appendChild(divForm);
    } else if (title === 'Удалить тикет') {
      modal.classList.add('modal-delete');

      body.appendChild(modal);

      const modalDel = document.querySelector('.modal-delete');
      const divForm = document.createElement('div');
      divForm.classList.add('div-form');
      const formDel = document.createElement('form');
      formDel.classList.add('form');

      const divButton = document.createElement('div');
      divButton.classList.add('div-button');
      divButton.insertAdjacentHTML('afterbegin', '<button class="btn-ok">Ok</button>');
      divButton.insertAdjacentHTML('afterbegin', '<button class="btn-cancel">Отмена</button>');
      formDel.appendChild(divButton);
      formDel.insertAdjacentHTML(
        'afterbegin',
        '<div class="text-del">Вы уверены, что хотите удалить тикет? Это действие не обратимо.</div>',
      );
      divForm.appendChild(formDel);

      modalDel.appendChild(divForm);
    } else {
      modal.classList.add('modal-?'); // console.log(modal);
    }
  }
}
