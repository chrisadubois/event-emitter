export class Emitter {
  constructor() {
    this._events = {};
  }

  emit(eventName, ...args) {
    const listeners = this._events[eventName];

    if (!listeners) {
      return;
    }
    listeners.forEach((cb) => {
      if (typeof cb === "function") {
        cb(...args);
      }
    });
  }

  listeners(eventName) {
    return this._events[eventName];
  }

  off(eventName, listener) {
    const listeners = this._events[eventName];

    if (!listeners || !listeners.length) {
      return;
    }
    const index = listeners.findIndex((l) => l === listener);
    if (index >= 0) {
      this._events[eventName].splice(index, 1);
    }
  }

  on(eventName, listener) {
    if (typeof listener !== "function") {
      throw new Error("listener passed to on must be a function");
    }
    this._events[eventName] = this._events[eventName] || [];
    this._events[eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    const wrapper = (...args) => {
      listener(...args); // TODO;
      this.off(eventName, wrapper);
    };
    return this.on(eventName, wrapper);
  }

  removeAllListeners(eventName) {
    this._events[eventName] = [];
    return this;
  }

  clearAllListeners() {
    Object.keys(this._events).forEach((key) => {
      this.removeAllListeners(key);
    });
    return this;
  }
}
