import {Component} from "react";
import React from 'react';
import {words} from '../models/words'
import './Home.css'

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
      correctWordCount: 0
    }
  }

  render() {
    return <div className={'home'}>
      {this.getRandomWords()}
      {this.getInputTextBox()}
    </div>;
  }

  getRandomWords() {
    return words.map((word, index) => {
      return <span key={index} id={index}
                   className={this.isSelected(index) ? this.state.wordCurrentStyle
                     : this.actualWordStyle[index] ? this.actualWordStyle[index] : ""}> {word}
      </span>
    })
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