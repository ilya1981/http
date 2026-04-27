/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
import TicketForm from './TicketForm';

const container = document.querySelector('.container'); // console.log(container);
const ticketForm = new TicketForm();
// let parentElementDel = null;
// console.log(ticketForm);

export default class TicketView {
  constructor() {
    this.addTicket = {
      id: '',
      status: '',
      name: '',
      description: '',
      created: '',
    };
  }

  list(tickets) {
    // console.log(this.name); // вывел чтобы ошибка пропала, что не используется
    // console.log(this.addTicket); // вывел чтобы ошибка пропала, что не используется
    for (let i = 0; i < Object.entries(tickets).length; i++) {
      const ticketElement = document.createElement('div');
      ticketElement.className = 'ticket-element';
      container.appendChild(ticketElement);

      const ticket = document.createElement('div');
      ticket.className = 'ticket';
      ticketElement.appendChild(ticket);
      const inputDiv = document.createElement('div');
      inputDiv.className = 'checkbox-done status';
      ticket.appendChild(inputDiv);
      const inputCheckbox = document.createElement('input');
      inputCheckbox.setAttribute('type', 'checkbox');
      inputCheckbox.className = 'checkbox-input';
      if (tickets[i].status === true) {
        // console.log('TRUE');
        inputCheckbox.checked = true;
      }
      inputDiv.appendChild(inputCheckbox);
      inputCheckbox.addEventListener('click', (e) => {
        const thisChecke = this;
        this.inputCheckbox(e, thisChecke);
      });

      const title = document.createElement('div');
      title.className = 'title';
      title.textContent = tickets[i].name;
      ticket.appendChild(title);
      const created = document.createElement('div');
      created.className = 'created';
      const d = new Date(tickets[i].created); // console.log(d);
      const year = d.getFullYear(); // год
      const month_ = d.getMonth() + 1; // почему то неправильно вычисляет месяц, добавил + 1
      const month = month_ < 10 ? `0${month_}` : month_; // месяц
      const date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate(); // день
      const hour = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours(); // час
      const minutes = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes(); // минуты
      created.textContent = `${date}.${month}.${year} ${hour}.${minutes}`;
      ticket.appendChild(created);

      const id = document.createElement('div');
      id.className = 'id display-none';
      id.value = tickets[i].id;
      ticket.appendChild(id);

      const buttonEdit = document.createElement('div');
      buttonEdit.classList.add('button-edit');
      ticket.appendChild(buttonEdit);
      buttonEdit.addEventListener('click', (e) => {
        const eTargetTicketElementEdit = e.target.closest('.ticket-element');
        this.modalEdit(eTargetTicketElementEdit);
        const ticketElem = e.target.closest('.ticket-element');
        // краткое описание
        const modalTitle = ticketElem.querySelector('.title').textContent;
        // подробное описание
        const description = ticketElem.querySelector('.description').textContent;
        const modalEdit = document.querySelector('.modal-edit');
        const dInputModal = modalEdit.querySelector('input.d');
        const ddInputModal = modalEdit.querySelector('input.dd');
        dInputModal.value = modalTitle;
        ddInputModal.value = description;
      });
      buttonEdit.insertAdjacentHTML('afterbegin', '<p>&#9998;</p>');

      const buttonX = document.createElement('div');
      buttonX.classList.add('button-x');
      buttonX.textContent = 'X';
      buttonX.addEventListener('click', (e) => {
        const eTargetTicketElementDel = e.target.closest('.ticket-element');
        this.modalDelete(eTargetTicketElementDel);
      });
      ticket.appendChild(buttonX);

      const description = document.createElement('div');
      description.classList.add('description');
      description.classList.add('display-none');
      description.textContent = tickets[i].description;
      ticketElement.addEventListener('click', (e) => {
        if (
          e.target.classList.value === 'ticket' ||
          e.target.classList.value === 'created' ||
          e.target.classList.value === 'title' ||
          e.target.classList.value === 'ticket-element'
        ) {
          const currentTicket = e.target.closest('.ticket-element');
          const descriptionDisplay = currentTicket.querySelector('.description');

          const ticketAll = e.target.closest('.container').querySelectorAll('.ticket-element');

          if (descriptionDisplay.classList.contains('display-none')) {
            for (let ii = 0; ticketAll.length > ii; ii++) {
              if (!ticketAll[ii].querySelector('.description').classList.contains('display-none')) {
                ticketAll[ii].querySelector('.description').classList.add('display-none');
              }
            }
            descriptionDisplay.classList.remove('display-none');
          } else {
            descriptionDisplay.classList.add('display-none');
          }
        }
      });
      ticketElement.appendChild(description);
    }
  }

  modalAdd(e) {
    e.preventDefault();
    ticketForm.form('Добавить тикет');
  }

  modalEdit(eTargetTicketElementEdit) {
    ticketForm.form('Изменить тикет');

    const body = document.querySelector('body');
    body.insertAdjacentHTML('beforeEnd', '<div class="modal-overlay"></div>');
    const cansel = document.querySelector('.btn-cancel');
    cansel.addEventListener('click', (event) => {
      event.preventDefault();
      const modalOverlay = body.querySelector('.modal-overlay');
      modalOverlay.remove();
      const modalEdit = body.querySelector('.modal-edit');
      modalEdit.remove();
    });
    const ok = document.querySelector('.btn-ok');

    ok.addEventListener('click', (e) => {
      e.preventDefault(); // console.log(ok);

      this.editTicket(eTargetTicketElementEdit);
      // location.reload(); // принудительно перезагрузка страницы
      window.location.reload();
    });
  }

  async editTicket(eTargetTicketElementEdit) {
    const idEdit = eTargetTicketElementEdit.querySelector('.id');
    const title = document.querySelector('input.d');
    const description = document.querySelector('input.dd');
    const status = eTargetTicketElementEdit.querySelector('.checkbox-input');

    // Объект, тело запроса
    const objRequestBodyEdit = {
      name: title.value,
      description: description.value,
      status: status.checked,
    };
    try {
      const response = await fetch(`http://localhost:7070/?method=updateById&id=${idEdit.value}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objRequestBodyEdit),
      });
      this.tickets = await response.json(); // console.log(this.tickets);
    } catch (error) {
      console.error('Ошибка:', error.message);
      throw error;
    }

    const body = document.querySelector('body');
    const modalOverlay = body.querySelector('.modal-overlay');
    const modalEdit = body.querySelector('.modal-edit');
    modalOverlay.remove();
    modalEdit.remove();
  }

  modalDelete(eTargetTicketElementDel) {
    ticketForm.form('Удалить тикет');
    const body = document.querySelector('body');
    body.insertAdjacentHTML('beforeEnd', '<div class="modal-overlay"></div>');
    const cansel = document.querySelector('.btn-cancel');
    cansel.addEventListener('click', (event) => {
      const modalOverlay = body.querySelector('.modal-overlay');
      const modalEdit = body.querySelector('.modal-delete');
      event.preventDefault();
      modalOverlay.remove();
      modalEdit.remove();
    });
    const ok = document.querySelector('.btn-ok');

    ok.addEventListener('click', () => {
      this.deleteTicket(eTargetTicketElementDel);
      // location.reload(); // принудительно перезагрузка страницы
      window.location.reload();
    });
  }

  async deleteTicket(eTargetTicketElementDel) {
    const idDel = eTargetTicketElementDel.querySelector('.id');

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      // подписываемся на событие изменеия статуса запроса
      if (xhr.readyState !== 4) return;
      console.log(xhr.responseText);
    };

    xhr.open('DELETE', `http://localhost:7070/?method=deleteById&id=${idDel.value}`);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();

    const body = document.querySelector('body');
    const modalOverlay = body.querySelector('.modal-overlay');
    const modalDel = body.querySelector('.modal-delete');
    modalOverlay.remove();
    modalDel.remove();
  }

  inputCheckbox(e, thisChecke) {
    async function inputChecked() {
      const eTargetTicketElementCheck = e.target.closest('.ticket-element');
      const idCheck = eTargetTicketElementCheck.querySelector('.id');
      const status = eTargetTicketElementCheck.querySelector('.checkbox-input');
      const objRequestBodyChecked = {
        status: status.checked,
      };

      try {
        const response = await fetch(`http://localhost:7070/?method=updateById&id=${idCheck.value}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(objRequestBodyChecked),
        });
        thisChecke.tickets = await response.json();
      } catch (error) {
        console.error('Ошибка:', error.message);
        throw error;
      }
    }

    inputChecked(e);
  }
}
