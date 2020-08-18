import React, { Component } from "react";

export default class JokeItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleClickAdd = () => {
    this.props.addVote(this.props.id);
  };
  handleClickSubtract = () => {
    this.props.subtractVote(this.props.id);
  };

  render() {
    const { joke, vote } = this.props;
    const classColor = ["negative", "happy", "laugh", "rofl"];
    const emojis = ["🙄", "😃", "😂", "🤣"];
    let border;
    let emoji;
    if (vote >= 20) {
      border = classColor[3];
      emoji = emojis[3];
    } else if (vote <= 19 && vote > 10) {
      border = classColor[2];
      emoji = emojis[2];
    } else if (vote <= 10 && vote >= 0) {
      border = classColor[1];
      emoji = emojis[1];
    } else {
      border = classColor[0];
      emoji = emojis[0];
    }
    return (
      <li>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button className="voting up" onClick={this.handleClickAdd}>
            <i className="fas fa-arrow-up"></i>
          </button>
          <h2 className={`Votes ${border}`}>{vote}</h2>
          <button className="voting down" onClick={this.handleClickSubtract}>
            <i className="fas fa-arrow-down"></i>
          </button>
        </div>
        <p>{joke}</p>
        <h3>{emoji}</h3>
      </li>
    );
  }
}
