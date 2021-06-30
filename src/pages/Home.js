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
      words: this.shuffle(words),
      timeInSeconds: 60,
      isTimerStarted: false,
      isWordVisible: false
    }
    this.decrementSeconds = this.decrementSeconds.bind(this);
    this.startTest = this.startTest.bind(this);
  }

  render() {
    return <div className={'home'}>
      {this.getRandomWords()}
      {this.getInputTextBox()}
      <button className={'start-button'} onClick={() => this.startTest()}>Start</button>
      0:{this.state.timeInSeconds}
      <p className={this.state.isWordVisible ? "hidden" : 'correct-words'}>Correct words
        :{this.state.correctWordCount}</p>
    </div>;
  }

  startTest() {
    this.setState({isWordVisible: true})
    this.interval = setInterval(this.decrementSeconds, 1000);
    if (this.state.timeInSeconds === 0) {
      this.initialiseTimer();
      this.initialiseNextWordSet();
      this.setState({correctWordCount: 0})
      this.setState({currentWord: ""})
    }
  }

  initialiseTimer() {
    //todo testing is pending
    this.setState({timeInSeconds: 60})
    clearInterval(this.interval)
  }

  decrementSeconds() {
    // todo testing
    if (this.state.timeInSeconds > 0) {
      this.setState({timeInSeconds: this.state.timeInSeconds - 1})
    }
  }

  shuffle(words) {
    return words.sort(() => .5 - Math.random());
  }

  getRandomWords() {
    if (this.state.wordCount > MAX_WORD_COUNT) this.initialiseNextWordSet()
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

  initialiseNextWordSet() {
    // todo testing is pending
    this.setState({wordCount: 0})
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