import './App.css';
import { useState } from 'react'
import { create, all } from 'mathjs';

const math = create(all);

function App() {
  const [display, setDisplay] = useState('0')
  const displayString = display.toString()

  let arr = displayString.split('')
  const actualNum = displayString.match(/[\d.]+$/);
  const firstChar = arr[0];
  const lastChar= arr[arr.length - 1];
  const actualSign = arr[arr.length - 2];
  const previousSign = arr[arr.length - 5];

  const handleNum = (event) => {
    let num = event.target.textContent;

    if(display === '0'){
      setDisplay(num);  /* if zero is on the display, it is changed to num */
    } 
    else if (lastChar === '0' && actualNum[0] === '0'){ /* if lastChar is zero and actualNum first number is zero */
      arr.splice(arr.length - 1, 1, num) // change the 0 by "num"
      setDisplay(arr.join(''))
    }
    else {
      setDisplay(displayString + num) /* the previous  display and the current num are concatenated*/
    }
  }

  const handleSubtraction = (event) => {
    let subtraction = event.target.textContent; // subtraction symbol  

    if(actualSign === '-' && ['+','-','/','*'].includes(previousSign)){} // if last sign is a '-' and second to last is any operator, do nothing
    else if(lastChar !== '.'){
      setDisplay(displayString + ' ' + subtraction + ' ')
    }
  }

  const handleOperator = (event) => {
    let operator = event.target.textContent; // the actual operator (+,-,*,/) 
    
    if(['+','-','/','*'].includes(actualSign)){ // if last sign was (+, -, / or *) 
      if(actualSign !== operator && ['+','-','*','/'].includes(previousSign)){  // if the last sign isn't the ACTUAL operator but second to last is any operator 
        arr.splice(arr.length - 5, 4, operator) // delete both operators and add the actual operator
        setDisplay(arr.join('')) 
      }
      else if(actualSign !== operator){
        arr.splice(arr.length - 2, 1, operator);
        setDisplay(arr.join(''));
      }
    } 
    else if(lastChar !== '.') { // else (last char is a number, and isnt a decimal sign ("."))
      setDisplay(displayString + ' ' + operator + ' ')
    }
  }

  const handleEquals = () => {
    if(!['+','-','*','/'].includes(actualSign) && lastChar !== '.'){
        let result = math.evaluate(displayString);
        let resultFormated = Number.isInteger(result) ? result.toFixed(0) : result.toFixed(6);
        setDisplay(resultFormated)
    } 
  }

  const handleClear = () => {
    setDisplay('0')
  }

  const handleDecimal = () => {
    let arr = displayString.split(' ') // array - group of numbers and symbols separated (['234','+','826'])
    let lastElement = arr[arr.length - 1] // select the last group of numbers or symbols

    if(!lastElement.includes('.')){
      setDisplay(displayString + '.')
    }
  }

  return (
    <div className="App">
      <div className='background-brightness'>
        <div id='calculator'>
          <div className='' id='display'>
            <p className='total-text'>{display}</p>
            <p className='num-text'>
              {lastChar === ' ' ? actualSign : 
              firstChar === '-' ? display : actualNum}
            </p>
          </div>

          <div className='btn' id='clear' onClick={handleClear}>AC</div>
          <div className='operator btn' id='divide' onClick={handleOperator}>/</div>
          <div className='operator btn' id='multiply' onClick={handleOperator}>*</div>

          <div className='num btn' id='seven' onClick={handleNum}>7</div>
          <div className='num btn' id='eight' onClick={handleNum}>8</div>
          <div className='num btn' id='nine' onClick={handleNum}>9</div>
          <div className='operator btn' id='subtract' onClick={handleSubtraction}>-</div>

          <div className='num btn' id='four' onClick={handleNum}>4</div>
          <div className='num btn' id='five' onClick={handleNum}>5</div>
          <div className='num btn' id='six' onClick={handleNum}>6</div>
          <div className='operator btn' id='add' onClick={handleOperator}>+</div>

          <div className='num btn' id='one' onClick={handleNum}>1</div>
          <div className='num btn' id='two' onClick={handleNum}>2</div>
          <div className='num btn' id='three' onClick={handleNum}>3</div>
          <div className='btn' id='equals' onClick={handleEquals}>=</div>

          <div className='num btn' id='zero' onClick={handleNum}>0</div>
          <div className='num btn' id='decimal' onClick={handleDecimal}>.</div>
        </div>
      </div>
    </div>
  );
}
export default App;