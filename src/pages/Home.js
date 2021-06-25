import {Component} from "react";
import React from 'react';
import {words} from '../models/words'
import './Home.css'

const MAXWORDCOUNT = 20;

class Home extends Component {
  actualWordStyle = {
    0: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      currentWord: "",
      selectedWord: "",
      wordCurrentStyle: "highlight",
      wordCount: 0,
      correctWordCount: 0,
      words: words
    }
  }

  render() {
    return <div className={'home'}>
      {this.getRandomWords()}
      {this.getInputTextBox()}
    </div>;
  }

  shuffle(words) {
    return words.sort(() => .5 - Math.random());
  }

  getRandomWords() {
    this.state.wordCount > MAXWORDCOUNT && this.initialise()
    return this.state.words.slice(0, 21).map((word, index) => {
      return <span key={index} id={index}
                   className={this.isSelected(index) ? this.state.wordCurrentStyle
                     : this.actualWordStyle[index] ? this.actualWordStyle[index] : ""}> {word}
      </span>
    })
  }

  initialise() {
    console.log(this.state.correctWordCount)
    this.setState({wordCount: 0})
    this.setState({words: this.shuffle(this.state.words)})
    this.actualWordStyle = {};
  }

  getInputTextBox() {
    return (<input type={'text'} className={"TextBox"}
                   onChange={(event) => {
                     this.handleWordChange(event.target.value)
                   }}
                   value={this.state.currentWord}
                   tabIndex={18}
    />)
  }

  handleWordChange(word) {
    if (this.completeCorrect(word)) {
      this.setState({correctWordCount: this.state.correctWordCount + 1})
      this.actualWordStyle[this.state.wordCount] = "correct"
    }
    if (this.incorrect(word)) {
      this.actualWordStyle[this.state.wordCount] = "inCorrect"
      this.setState({wordCurrentStyle: "inCorrect-highlight"})
    }
    if (this.correctIncomplete(word)) {
      this.setState({wordCurrentStyle: "highlight"})
    }
    if (word.includes(" ")) {
      this.setState({currentWord: ""})
      this.setState({wordCount: this.state.wordCount + 1})
      this.setState({wordCurrentStyle: "highlight"})
      return
    }
    this.setState({currentWord: word})
  }

  isSelected = (index) => {
    return index === this.state.wordCount;
  }

  correctIncomplete(word) {
    return words[this.state.wordCount].includes(word) && words[this.state.wordCount].length > word.length;
  }

  incorrect(word) {
    return words[this.state.wordCount] !== (word.trim());
  }

  completeCorrect(word) {
    return words[this.state.wordCount] === word;
  }
}

export default Home;