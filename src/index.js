import "./styles.css";
import { Emitter } from "./emitter";

const inputEmitterName = document.getElementById("emitter-name");
const inputEmitterValue = document.getElementById("emitter-value");
const inputListener = document.getElementById("listener");
const inputListenerOnce = document.getElementById("listener-once");
const eventEmitter = new Emitter();

const eventsElement = document.getElementById("events");

const appendEvents = (event) => {
  eventsElement.appendChild(
    document
      .createElement("div")
      .appendChild(document.createTextNode(event.data || "NA"))
  );
};

const listenHandler = () => {
  const listenValue = inputListener.value;
  eventEmitter.on(listenValue, appendEvents);
};

const listenOnceHandler = () => {
  const listenValue = inputListenerOnce.value;
  eventEmitter.once(listenValue, appendEvents);
};

const emitHandler = () => {
  const emitValue = inputEmitterValue.value;
  const emitName = inputEmitterName.value;
  eventEmitter.emit(emitName, { data: emitValue });
};

const clearHandler = () => {
  eventEmitter.clearAllListeners();
};

document.getElementById("emit").addEventListener("click", emitHandler);
document.getElementById("listen").addEventListener("click", listenHandler);
document
  .getElementById("listen-once")
  .addEventListener("click", listenOnceHandler);
document.getElementById("clear").addEventListener("click", clearHandler);
