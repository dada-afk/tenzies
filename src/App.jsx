import React from 'react';
import Dice from './Dice';
import { nanoid } from 'nanoid';

export default function App() {

  const [dice, setDice] = React.useState(() => getAllRandom());

  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value);

  function getAllRandom() {
    const diceArr = [];
    for(let i = 0; i < 10; i++){
      diceArr.push(1);
    }
    return diceArr.map(() => (
      {
        value: Math.ceil(Math.random() * 6), 
        id: nanoid(), 
        isHeld: false}
    ))
  }

  const diceElements = dice.map((die) => {
    return (
    <Dice 
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={() => hold(die.id)}
      gameWon={gameWon}
    />
    )
  })

  function rollDice() {
    if(!gameWon) {
      setDice((prevDice) => prevDice.map((die) => {
        return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)};
      }))
    } else {
      setDice(getAllRandom());
    }
  }

  function hold(id) {
    setDice((prevDice) => prevDice.map((die) => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die;
    }))
  }

  return (
    <>
      <div className='container'>
        <h1>Tenzies</h1>
        <h2>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h2>
        <div className='dice-container'>
          {diceElements}
        </div>
        <button onClick={rollDice} className={gameWon ? 'new-game btn' : 'btn'}>{gameWon ? 'New Game' : 'Roll'}</button>
      </div>
    </>
  )
}
