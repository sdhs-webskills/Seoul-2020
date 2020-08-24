export const EventBus = {

  events: {},

  $on (eventName, callback) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(callback);
  },

  $emit (eventName, params) {
    this.events[eventName].forEach(event => event(params));
  }

}