import {Component} from "react";
import React from 'react';
import {words} from '../models/words'
import './Home.css'

const MAX_WORD_COUNT = 19;

class Home extends Component {
  actualWordStyle = {
    0: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      currentWord: "",
      selectedWord: "",
      selectedWordStyle: "highlight",
      wordCount: 0,
      correctWordCount: 0,
      words: words,
    }
  }

  render() {
    return <div className={'home'}>
      {this.getRandomWords()}
      {this.getInputTextBox()}
      number of correct words :{this.state.correctWordCount}
    </div>;
  }

  shuffle(words) {
    return words.sort(() => .5 - Math.random());
  }

  getRandomWords() {
    this.state.wordCount > MAX_WORD_COUNT && this.initialise()
    return (<div className={'words-bar'}>{this.state.words.slice(0, 20).map((word, index) => {
      return <span key={index} id={index}
                   className={this.getWordStatus(index)}>{word}
      </span>
    })}</div>)
  }

  getWordStatus(index) {
    return this.isSelected(index) ? this.state.selectedWordStyle
      : this.actualWordStyle[index] ? this.actualWordStyle[index] : "default";
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

    console.log(this.state.wordCount)
    if (this.completeCorrect(word)) {
      this.setState({correctWordCount: this.state.correctWordCount + 1})
      this.actualWordStyle[this.state.wordCount] = "correct"
    }
    if (this.isIncorrect(word)) {
      this.actualWordStyle[this.state.wordCount] = "inCorrect"
      this.setState({selectedWordStyle: "inCorrect-highlight"})
    }
    if (this.correctIncomplete(word)) {
      this.setState({selectedWordStyle: "highlight"})
    }
    if (word.includes(" ")) {
      this.setState({currentWord: ""})
      this.setState({wordCount: this.state.wordCount + 1})
      this.setState({selectedWordStyle: "highlight"})
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

  isIncorrect(word) {
    return words[this.state.wordCount] !== (word.trim());
  }

  completeCorrect(word) {
    return words[this.state.wordCount] === word;
  }
}

export default Home;