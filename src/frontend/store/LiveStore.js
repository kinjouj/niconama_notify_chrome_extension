import LiveState from "./LiveState.js";
import { Store } from "almin";

export default class LiveStore extends Store {
  constructor() {
    super();
    this.state = new LiveState();
  }

  getState() {
    return this.state;
  }

  receivePayload(payload) {
    switch (payload.type) {
      case "fetch-completed":
        const newState = new LiveState(payload.value);
        this.setState(newState);
    }
  }
}
