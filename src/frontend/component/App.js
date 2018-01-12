import React from "react";
import EntryList from "./EntryList.js";

export default class App extends React.Component {

  componentWillMount() {
    let appContext = this.props.appContext;
    let onChangeHandler = () => {
      this.setState(appContext.getState());
    };
    onChangeHandler();
    this.unSubscribe = appContext.onChange(onChangeHandler);
  }

  componentWillUnmount() {
    this.unSubscribe();
  }

  render() {
    return (
      <div>
        <EntryList
          appContext={this.props.appContext}
          liveState={this.state.live} />
      </div>
    )
  }
}
