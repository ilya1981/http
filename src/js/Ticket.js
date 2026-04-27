// export default class Ticket {
//   constructor() {
//     this.id;
//     this.name;
//     this.description;
//     this.status;
//     this.created;
//   }
// }

// Было
export default class Ticket {
  constructor({ id, name, description, status, created }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.created = created;
  }
}
