import { UseCase } from "almin";

export default class FetchUseCase extends UseCase {
  execute() {
    return new Promise((resolve, reject) => {
      chrome.runtime.getBackgroundPage(bg => {
          bg.sync().then(notifyboxes => {
            resolve(notifyboxes);
          });
      });
    }).then(value => {
      this.dispatch({ type: "fetch-completed", value });
    });
  }
}
