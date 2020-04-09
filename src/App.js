import React, { Component } from "react";
import "./App.css";
import Display from "./components/Display/Display.js";
import Clear from "./components/Clear/Clear.js";
import NumPad from "./components/NumPad/NumPad.js";
import Operator from "./components/Operator/Operator.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
      input: 0,
      display: 0
    };
  }

  calculateQueue = async () => {
    let parsedNumber = parseInt(this.state.input);
    if (this.state.input !== 0) {
      await this.addToQueue(parsedNumber)
    }
    
    const equation = this.state.queue;
    var answer = equation[0];
    for (var i = 2; i < equation.length; i = i + 2) {
      // eslint-disable-next-line default-case
      switch (this.state.queue[i - 1]) {
        case "+":
          answer += equation[i];
          break;

        case "-":
          answer -= equation[i];
          break;
        case "÷":
          answer = answer / equation[i];
          break;
      }
    }
    answer = answer.toFixed(10);
    answer = parseFloat(answer);
    this.setState({
      queue: [],
      display: answer
    });
  };

  addToQueue = input => {
    return new Promise((resolve, reject) => {
      let newQueue = [...this.state.queue];
      newQueue.push(input);
      this.setState({
        queue: newQueue
      }, () => resolve())})
  };

  numericButton = e => {
    let value = this.state.input += e.target.innerText;
    let parsedValue = parseInt(value);
    this.setState({
      input: value,
      display: parsedValue
    });
  };

  clearAll = number => {
    let value = [...this.state.queue];
    value.splice(number, value.length);
    this.setState({
      queue: value,
      input: 0,
      display: 0
    });
  };

  operators = async (arg) => {
    let operator = arg.target.innerText;
    let parsedNumber = parseInt(this.state.input);

    if (this.state.input !== 0 && this.state.input !== "-") {
      await this.addToQueue(parsedNumber);
      await this.addToQueue(operator);
      this.setState({
        input: 0,
        display: operator
      });
    }
    if (arg === "-" && isNaN(this.state.queue[0]) && this.state.input !== "-") {
      await this.addToQueue("-");
    }
  };

  render() {
    return (
      <div className="App">
        <div className="calculator">
          <Display className="display">{this.state.display}</Display>
          <div className="row">
            <Clear click={this.clearAll} />
            <Operator click={this.operators}>÷</Operator>
          </div>
          <div className="row">
            <NumPad click={this.numericButton}>7</NumPad>
            <NumPad click={this.numericButton}>8</NumPad>
            <NumPad click={this.numericButton}>9</NumPad>
            <Operator click={this.operators}>−</Operator>
          </div>
          <div className="row">
            <NumPad click={this.numericButton}>4</NumPad>
            <NumPad click={this.numericButton}>5</NumPad>
            <NumPad click={this.numericButton}>6</NumPad>
            <Operator click={this.operators}>+</Operator>
          </div>
          <div className="row">
            <NumPad click={this.numericButton}>1</NumPad>
            <NumPad click={this.numericButton}>2</NumPad>
            <NumPad click={this.numericButton}>3</NumPad>
            <Operator click={this.calculateQueue}>=</Operator>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
