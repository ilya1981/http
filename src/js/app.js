import HelpDesk from './HelpDesk';
import TicketService from './TicketService';

const root = document.getElementById('root');

const ticketService = new TicketService();
const app = new HelpDesk(root, ticketService);

app.init();

// до БЫЛО  // console.log(app.ticketService);
app.ticketService.list();
// ---------
const ticketBtnAdd = document.querySelector('.ticket-btn-add');
ticketBtnAdd.addEventListener('click', (e) => {
  e.preventDefault(); // console.log('ticketBtnAdd');
  app.ticketService.modalAdd(e);
});
