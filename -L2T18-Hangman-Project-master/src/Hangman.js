import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import { reactWords } from "./Words";
import "./Hangman.css";
import Help from "./Help";
import Confetti from "react-confetti";
import HangmanImage from "./components/HangmanImage";
import WordToGuess from "./components/WordToGuess";
import Keyboard from "./components/GenerateKeypad";
import RestartButton from "./components/RestartButton";
import state1 from "./hangmandrawings/state1.gif";
import state2 from "./hangmandrawings/state2.gif";
import state3 from "./hangmandrawings/state3.gif";
import state4 from "./hangmandrawings/state4.gif";
import state5 from "./hangmandrawings/state5.gif";
import state6 from "./hangmandrawings/state6.gif";
import state7 from "./hangmandrawings/state7.gif";
import state8 from "./hangmandrawings/state8.gif";
import state9 from "./hangmandrawings/state9.gif";
import state10 from "./hangmandrawings/state10.gif";
import state11 from "./hangmandrawings/state11.gif";

// Using class-based component
class Hangman extends Component {
  static defaultProps = {
    images: [
      state1,
      state2,
      state3,
      state4,
      state5,
      state6,
      state7,
      state8,
      state9,
      state10,
      state11,
    ],
    maxWrong: 11,
  };

  // Define the initial state
  constructor(props) {
    super(props);
    this.state = {
      noOFWrong: 0,
      guessed: new Set(),
      answer: reactWords(),
      isWinner: false, // Whether the user has won
      showConfetti: false, // Whether to show confetti animation
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }

  // Restarting the game
  reset() {
    this.setState({
      noOFWrong: 0,
      guessed: new Set(),
      answer: reactWords(),
      isWinner: false, // Reset isWinner state
      showConfetti: false, // Reset showConfetti state
    });
  }

  // Handle user's guess
  handleGuess(letter) {
    let guessed = this.state.guessed;
    guessed.add(letter);

    // Check if the user has won
    let isWinner = [...this.state.answer].every(
      (char) => this.state.guessed.has(char) || char === " "
    );

    this.setState({
      guessed: guessed,
      noOFWrong:
        this.state.noOFWrong + (this.state.answer.includes(letter) ? 0 : 1),
      isWinner: isWinner, // Update isWinner state
      showConfetti: isWinner, // Show confetti if the user wins
    });
  }

  // Render the component
  render() {
    let gameOver = this.state.noOFWrong >= this.props.maxWrong;
    let answerArray = this.state.answer
      .split("")
      .map((letter) => (this.state.guessed.has(letter) ? letter : "_"));

    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <Help />
        <HangmanImage
          images={this.props.images}
          noOFWrong={this.state.noOFWrong}
        />
        <p className="Hangman-word">
          {!gameOver ? answerArray : this.state.answer}
        </p>
        <Keyboard
          handleGuess={this.handleGuess}
          guessed={this.state.guessed}
          gameOver={gameOver}
        />
        <RestartButton reset={this.reset} />
        <p className="Hangman-message">
          {!gameOver
            ? this.state.isWinner
              ? "You Win!"
              : "Guess the word before the man gets hanged!"
            : "Game Over. The word was " + this.state.answer}
        </p>
        {this.state.showConfetti && <Confetti />}{" "}
        {/* Show confetti if showConfetti is true */}
      </div>
    );
  }
}

export default Hangman;
