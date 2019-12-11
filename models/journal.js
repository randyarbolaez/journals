class Journal {
  constructor(id, ownerId, date, title, entry) {
    this.id = id;
    this.ownerId = ownerId;
    this.date = date;
    this.title = title;
    this.entry = entry;
  }

  get readableDate() {
    return this.date.toLocaleDateString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    // return moment(this.date).format('MMMM Do YYYY, hh:mm');
  }
}

export default Journal;
