import {Component} from "react";
import React from 'react';
import {words} from '../models/words'
import './Home.css'

class Home extends Component {
  wordsStyle = {
    0: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      currentWord: "",
      selectedWord: "",
      wordStatus: "highlight",
      wordCount: 0,
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
      return <span id={index}
                   className={this.wordsStyle[index] ? this.wordsStyle[index]
                     : this.isSelected(word, index) ? this.state.wordStatus : ""}> {word}
      </span>
    })
  }

  getInputTextBox() {
    return (<input type={'text'} className={"TextBox"}
                   onChange={(event) => {
                     this.handleWordChange(event.target.value)
                     this.handleWordStatus()
                   }}
                   value={this.state.currentWord}
                   tabIndex={18}
    />)
  }

  handleWordStatus = () => {
    const selectedWord = words[this.state.wordCount];
    if (this.isCorrectCompleteWord(selectedWord)) {
      this.wordsStyle[this.state.wordCount] = 'correct'
      return
    }
    if (this.isCorrectIncompleteWord(selectedWord)) {
      this.setState({wordStatus: 'highlight'})
      return
    }
    if (this.isIncompleteIncorrectWord(selectedWord)) {
      this.wordsStyle[this.state.wordCount] = 'inCorrect'
      return
    }
  }

  isCorrectIncompleteWord(selectedWord) {
    return selectedWord.includes(this.state.currentWord) || !this.state.currentWord;
  }

  isCorrectCompleteWord(selectedWord) {
    return selectedWord === this.state.currentWord;
  }

  isIncompleteIncorrectWord(selectedWord) {
    return selectedWord !== this.state.currentWord;
  }

  handleWordChange(value) {
    const selectedWord = words[this.state.wordCount];
    if (value.includes(" ")) {
      this.handleIncorrectWord(selectedWord);
      this.setState({currentWord: ""});
      this.setState({wordCount: this.state.wordCount + 1});
      return
    }
    this.setState({currentWord: value});
  }

  handleIncorrectWord(selectedWord) {
    if (this.isIncompleteIncorrectWord(selectedWord))
      this.wordsStyle[this.state.wordCount] = 'inCorrect'
  }

  isSelected = (word, index) => {
    return index === this.state.wordCount;
  }
}

export default Home;