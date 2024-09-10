//import WindowTracker from './WindowTracker';
import React from 'react';
import './App.css';
import Dice from './dice';
import {nanoid} from "nanoid" 
//import Confetti from "react-confetti"

function App(){

  const [die,setDie]= React.useState(allnewDice())
  const [tenzies,setTenzies]= React.useState(false)
  // const [isRunning,setIsRunning]=React.useState(false)
  // const [time,setTime]= React.useState(0)
  const [rollCount,setRollCount]=React.useState(0)

  // React.useEffect(()=>{
  //   if(!tenzies){
  //     setIsRunning(true)
  //   }else if(tenzies){
  //     setIsRunning(false)
  //   }
  // },[tenzies])

  React.useEffect(()=>{

    const allHeld= die.every(element=>element.isHeld)
    const firstValue= die[0].value
    const allSameValue = die.every((element)=>(element.value===firstValue))

    if(allHeld && allSameValue){
      setTenzies(true)
    }
  },[die])

  // React.useEffect(()=>{
  //   let interval;
  //   if(!tenzies){
  //     interval=setInterval(()=>{
  //       setTime(time=>time+1);
  //     },1000);
  //   }else if(tenzies){
  //     clearInterval(interval);
  //     setTime(0);
  //   }
  // },[tenzies])
  

  function allnewDice(){
    const newDice =[]
    for(let i=0; i<10;i++ ){
      newDice.push({
        value:Math.ceil(Math.random()*6),
        isHeld:false,
        id: nanoid()
      })
    }
    return newDice
  }

  function changeHold(id){
    setDie(die=>die.map((oldDie=>{
      if(oldDie.id===id){
        return({
          ...oldDie,
          isHeld:!oldDie.isHeld
        })
      }else{
        return oldDie
      }
    })))
  }

  const diceValues=die.map((eachDie)=>{
    return(
      <Dice
        key={eachDie.id}
        value={eachDie.value}
        isHeld={eachDie.isHeld}
        changeHold={()=>changeHold(eachDie.id)}
      />
    )
  })

  function rollDice(){
    if(tenzies){
      setTenzies(false)
      setDie(allnewDice())
      setRollCount(0)
      
    }else{
      setDie(die=>die.map(oldDie=>{
        return(oldDie.isHeld?(oldDie):{...oldDie,value:Math.ceil(Math.random()*6)})
      }))
      setRollCount((count)=>count+1)
    }
  }

  return (
    <div className="App">
      <main>
        <h1 className='title'>Tenzies</h1>
        <p className='game--info'>Roll until all dice are the same.Click each die to freeze it at its current value between rolls.</p>
        <div>
          <span><h3>No of Rolls : {rollCount}</h3></span>
          
        </div>
        <div className='dices'>
          {diceValues}
        </div>
        {tenzies&& <h3>Hurrah!! You Won</h3>}
        <button className='roller' onClick={rollDice}>
          {tenzies?"New Game" : "Roll" }
        </button>
      </main>
    </div>
  );
}

export default App;
