import {Component} from "react";
import React from 'react';
import {words} from '../models/words'
import './Home.css'
import Timer from "../components/timer/Timer";

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
      wordIndex: 0,
      correctWordCount: 0,
      words: this.shuffle(words),
      timeInSeconds: 60,
      isTimerStarted: false,
      isWordVisible: false
    }
    this.onTimerStart = this.onTimerStart.bind(this)
    this.onTimerEnd = this.onTimerEnd.bind(this)
  }

  render() {
    return <div className={'home'}>
      {this.getWordsBar()}
      {this.getInputTextBox()}
      <Timer seconds={this.state.timeInSeconds}
             start={this.state.isTimerStarted}
             onClick={this.onTimerStart}
             onEnd={this.onTimerEnd}
      />
      {!this.state.isWordVisible && this.displayResult()}
    </div>;
  }

  onTimerEnd() {
    this.setState({isWordVisible: false})
    this.setState({timeInSeconds: 60})
  }

  onTimerStart() {
    this.setState({words: this.shuffle(words)})
    this.setState({wordIndex: 0})
    this.setState({correctWordCount: 0})
    this.actualWordStyle = {};
    this.setState({isWordVisible: true})
    this.setState({currentWord: ""})
  }

  shuffle(words) {
    return words.sort(() => .5 - Math.random());
  }

  getWordsBar() {
    if (this.state.wordIndex > MAX_WORD_COUNT) this.getNextWordSet()
    return (
      <div
        className={this.state.isWordVisible ? 'words-bar' : "hidden"}>
        {this.state.words.slice(0, 20).map((word, index) => {
          return <span key={index} id={index}
                       className={this.getWordStatus(index)}>{word}
      </span>
        })}</div>)
  }

  getWordStatus(index) {
    return this.isSelected(index) ? this.state.selectedWordStyle
      : this.actualWordStyle[index] ? this.actualWordStyle[index] : "default";
  }

  getNextWordSet() {
    // todo testing is pending
    this.setState({wordIndex: 0})
    this.setState({words: this.shuffle(this.state.words)})
    this.actualWordStyle = {};
  }

  getInputTextBox() {
    return (<input type={'text'} className={"TextBox"}
                   onChange={(event) => {
                     this.handleWordChange(event.target.value)
                     this.handleWordVisibility()
                   }}
                   value={this.state.currentWord}
                   tabIndex={18}
    />)
  }

  handleWordChange(word) {
    //todo testing is pending
    if (this.completeCorrect(word)) {
      this.setState({correctWordCount: this.state.correctWordCount + 1})
      this.actualWordStyle[this.state.wordIndex] = "correct"
    }
    if (this.isIncorrect(word)) {
      this.actualWordStyle[this.state.wordIndex] = "inCorrect"
      this.setState({selectedWordStyle: "inCorrect-highlight"})
    }
    if (this.correctIncomplete(word)) {
      this.setState({selectedWordStyle: "highlight"})
    }
    if (word.includes(" ")) {
      this.setState({currentWord: ""})
      this.setState({wordIndex: this.state.wordIndex + 1})
      this.setState({selectedWordStyle: "highlight"})
      return
    }
    this.setState({currentWord: word})
  }

  handleWordVisibility() {
    // todo testing
    if (this.state.timeInSeconds === 0) {
      this.setState({isWordVisible: false})
    }
    if (!this.state.isTimerStarted) {
      this.setState({isTimerStarted: true})
    }
  }

  isSelected = (index) => {
    return index === this.state.wordIndex;
  }

  correctIncomplete(word) {
    return words[this.state.wordIndex].includes(word) && words[this.state.wordIndex].length > word.length;
  }

  isIncorrect(word) {
    return words[this.state.wordIndex] !== (word.trim());
  }

  completeCorrect(word) {
    return words[this.state.wordIndex] === word;
  }

  displayResult() {
    return (<div className={'result'}>
      Correct Words : {this.state.correctWordCount}
    </div>)
  }
}

export default Home;