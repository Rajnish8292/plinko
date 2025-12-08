class EventEmitter {
  constructor() {
    this.events = {};
  }

  initEvents(events) {
    events.forEach((event) => {
      if (!(event in this.events)) {
        this.events[event] = [];
      }
    });
  }
  subscribe(event, cb) {
    if (event in this.events) {
      this.events[event].push(cb);
    } else {
      this.events[event] = [cb];
    }
  }

  unSubscribe(event, cb) {
    if (event in this.events) {
      this.events[event] = this.events[event].filter((elem) => elem != cb);
    }
  }
  emit(event, data) {
    if (event in this.events) {
      this.events[event].forEach((cb) => {
        cb(data);
      });
    }
  }
}

export default EventEmitter;
