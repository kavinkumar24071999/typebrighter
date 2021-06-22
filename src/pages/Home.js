import {Component} from "react";
import React from 'react';
import {words} from '../models/words'
import './Home.css'

class Home extends Component {
  wordsClass = {
    0: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      currentInput: "",
      selectedWord: "",
      wordStatus: "highlight",
      spaceCount: 0,
    }
  }

  render() {
    return <div className={'home'}>
      {this.randomWords()}
      {this.getInputTextBox()}
    </div>;
  }

  randomWords() {
    return words.map((word, index) => {
      return <span id={index}
                   className={this.wordsClass[index] ? this.wordsClass[index]
                     : this.isSelected(word, index) ? this.state.wordStatus : ""}> {word}
      </span>
    })
  }

  getInputTextBox() {
    return (<input type={'text'} className={"TextBox"}
                   onChange={(event) => {
                     this.handleInputChange(event.target.value)
                     this.handleWordStatus()
                   }}
                   value={this.state.currentInput}
                   tabIndex={18}
    />)
  }

  handleWordStatus = () => {
    const selectedWord = words[this.state.spaceCount];
    if (selectedWord === this.state.currentInput) {
      this.wordsClass[this.state.spaceCount] = 'correct'
      return
    }
    if (!selectedWord.includes(this.state.currentInput) && selectedWord.length !== this.state.currentInput) {
      this.wordsClass[this.state.spaceCount] = 'inCorrect'
      return
    }
    if (selectedWord.includes(this.state.currentInput) || !this.state.currentInput) {
      this.setState({wordStatus: 'highlight'})
      return
    }
    this.setState({wordStatus: 'inCorrect'})
  }

  handleInputChange(value) {
    const selectedWord = words[this.state.spaceCount];
    if (value.includes(" ")) {
      if (selectedWord !== this.state.currentInput)
        this.wordsClass[this.state.spaceCount] = 'inCorrect'
      this.setState({currentInput: ""});
      this.setState({spaceCount: this.state.spaceCount + 1});
      return
    }
    this.setState({currentInput: value});
  }

  isSelected = (word, index) => {
    return index === this.state.spaceCount;
  }
}

export default Home;