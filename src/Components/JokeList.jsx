import React, { Component } from "react";
import axios from "axios";
import "../JokeList.css";
import JokeItem from "./JokeItem";

export default class JokeList extends Component {
  static defaultProps = {
    numJokestoGet: 10,
  };
  constructor(props) {
    super(props);

    this.state = {
      jokes: [],
      loading: false,
    };
  }

  componentWillMount() {
    this.setState({ loading: true }, this.getTenJokes);
  }

  async getTenJokes() {
    let jokes = [];
    while (jokes.length < this.props.numJokestoGet) {
      const response = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      jokes.push({ joke: response.data.joke, vote: 0 });
    }
    this.setState((state) => ({
      loading: false,
      jokes: [...state.jokes, ...jokes],
    }));
  }

  handleClick = () => {
    this.setState({ loading: true }, this.getTenJokes);
  };

  addVote = (index) => {
    const jokes = this.state.jokes;
    jokes[index] = { ...jokes[index] };
    jokes[index].vote += 1;
    this.setState({ jokes });
  };
  subtractVote = (index) => {
    const jokes = this.state.jokes;
    jokes[index] = { ...jokes[index] };
    jokes[index].vote -= 1;
    this.setState({ jokes });
  };

  render() {
    const sorted = this.state.jokes.sort((a, b) => b.vote - a.vote);
    const tenJokes = sorted.map((joke, index) => (
      <JokeItem
        key={index}
        joke={joke.joke}
        vote={joke.vote}
        addVote={this.addVote}
        subtractVote={this.subtractVote}
        id={index}
      />
    ));

    if (this.state.loading) {
      return (
        <div className="spinner">
          <i class="fa fa-spin">
            {" "}
            <span aria-label="Laugh" role="img">
              😂
            </span>
          </i>
          <br />
          <h1>Getting new jokes ... </h1>
        </div>
      );
    } else {
      return (
        <div className="JokeList">
          <div className="JokeTitle">
            <h1>Dad Jokes</h1>
            <p>
              <span aria-label="Laugh" role="img">
                😆
              </span>
            </p>
            <button className="addJokes" onClick={this.handleClick}>
              New Jokes
            </button>
          </div>
          <div className="JokeItems">
            <ul>{tenJokes}</ul>
          </div>
        </div>
      );
    }
  }
}
