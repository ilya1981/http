/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
import TicketView from './TicketView';

const ticketView = new TicketView();

export default class TicketService {
  constructor() {
    this.tickets = null;
  }

  // async list() {
  //   try {
  //     const response = await fetch('http://localhost:7070/?method=allTickets');
  //     this.tickets = await response.json();

  //     ticketView.list(this.tickets);
  //   } catch (error) {
  //     console.error('Ошибка:', error);
  //   }
  // }

  async list() {
    try {
      const response = await fetch('http://localhost:7070/?method=allTickets');

      this.tickets = await response.json();

      ticketView.list(this.tickets);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  modalAdd(e) {
    ticketView.modalAdd(e);
    const body = document.querySelector('body');
    body.insertAdjacentHTML('beforeEnd', '<div class="modal-overlay" id="modal-overlay"></div>');
    const cansel = document.querySelector('.btn-cancel');
    cansel.addEventListener('click', (event) => {
      event.preventDefault();
      const modalOverlay = body.querySelector('.modal-overlay');
      modalOverlay.remove();
      const modalAdd = body.querySelector('.modal-add');
      modalAdd.remove();
    });
    const ok = document.querySelector('.btn-ok');
    ok.addEventListener('click', () => {
      // (event) => { event.preventDefault();
      this.create();
    });
  }

  async create() {
    // data, callback
    const { addTicket } = ticketView;
    addTicket.name = document.querySelector('.d').value;
    addTicket.description = document.querySelector('.dd').value;
    // console.log(addTicket);
    try {
      const response = await fetch('http://localhost:7070/?method=createTicket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // ???
          name: addTicket.name,
          description: addTicket.description,
          status: false,
        }),
      });
      this.tickets = await response.json();
      // console.log(this.tickets);
    } catch (error) {
      console.error('Ошибка:', error.message);
      throw error;
    }
    const body = document.querySelector('body');
    const modalOverlay = body.querySelector('.modal-overlay');
    modalOverlay.remove();
    const modalAdd = body.querySelector('.modal-add');
    modalAdd.remove();
  }

  // Пока пустое закоментирую

  // list(callback) {}
  // get(id, callback) {}
  // create(data, callback) {}
  // update(id, data, callback) {}
  // delete(id, callback) {}
}
