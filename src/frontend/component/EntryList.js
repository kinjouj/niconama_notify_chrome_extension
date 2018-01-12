import React from "react";

export default class EntryList extends React.Component {
  render() {
    let entries = this.props.liveState.entries;
    let entryItems = entries.map(entry => {
      return (
        <div key={entry.id}>
          <img src={entry.thumbnail_url} />
          <h4>
            <a href={entry.thumbnail_link_url}>{entry.title}</a>
          </h4>
        </div>
      );
    });

    return (
      <div>
        {entryItems}
      </div>
    );
  }
}
