import { UseCase } from "almin";

export default class FetchUseCase extends UseCase {
  execute() {
    return new Promise((resolve, reject) => {
      chrome.runtime.onMessage.addListener(message => {
        resolve(message);
      });
    }).then(value => {
      this.dispatch({ type: "fetch-completed", value });
    });
  }
}
