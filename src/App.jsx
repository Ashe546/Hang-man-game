import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const nameSet = [
    "abandoned", "able", "absolute", "adorable", "adventurous", "academic", "acceptable", "acclaimed", "accomplished",
    "accurate", "aching", "acidic", "acrobatic", "active", "actual", "adept", "admirable", "admired", "adolescent",
    "adorable", "adored", "advanced", "afraid", "affectionate", "aged", "aggravating", "aggressive", "agile", "agitated",
    "agonizing", "agreeable", "ajar", "alarmed", "alarming", "alert", "alienated", "alive", "all", "altruistic", "amazing",
    "ambitious", "ample", "amused", "amusing", "anchored", "ancient", "angelic", "angry", "anguished", "animated", "annual",
    "another", "antique", "anxious", "any", "apprehensive", "appropriate", "apt", "arctic", "arid", "aromatic", "artistic",
    "ashamed", "assured", "astonishing", "athletic", "attached", "attentive", "attractive", "austere", "authentic",
    "authorized", "automatic", "avaricious", "average", "aware", "awesome", "awful", "awkward", "babyish", "bad", "back",
    "baggy", "bare", "barren", "basic", "beautiful", "belated", "beloved", "beneficial", "better", "best", "bewitched", "big",
    "bighearted", "biodegradable", "bitesized", "bitter", "black"
  ];

  const [count, setCount] = useState(1)
  const [answer, setAnswer] = useState([])
  const [WrongAnswer, setWrongAnswer] = useState([])
  const [status, setStatus] = useState('Guss The Correct Word')
  const [img, setimg] = useState('jpg')
  const [num , setNum] = useState(0)

  let text = nameSet[num].toLocaleUpperCase()
  let gussedword = []


  const handelSolve = (e) => {
    let result = text.includes(e.target.value);


    if (result === true) {
      gussedword = [...answer]
      gussedword.push(e.target.value)
      setAnswer(gussedword)
    } else {
      setWrongAnswer([...WrongAnswer, e.target.value])
      if (count < 7) {
        setCount(count + 1)
      } else {
        setCount("hangman")
        setimg('gif')
      }

    }
  }


  useEffect(() => {
    const x = [...new Set(text.split(""))]
    if (x.length === answer.length) {
      setCount("hangman")
      setStatus("Great job you have gussed the correct answer")
    }
  }, [handelSolve]);


  const handelStartover = () => {
    setCount(1)
    setimg('jpg')
    setWrongAnswer([])
    setAnswer([])
    setStatus("Guss The Correct Word")
    setNum(Math.floor(Math.random() * nameSet.length))
  }

  const handelShow = () => {
    const correct = text.split("")
    setAnswer(correct)
    setCount("hangman")
    setimg("gif")
    setStatus("The answer is")
  }

  const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  return (
    <div className="App">
      <h1 className='title'>{status}</h1>
      <div className='img'>
        <div id="1"><img className='image' src={`${count}.${img}`} alt=""></img></div>
      </div>
      <div>
        {count === "hangman"
          ? <h1>{text.split("").map((letter, i) => (<span key={i} className={` letter ${answer.includes(letter) === true ? "active" : "revel"}`}>{letter}</span>))}</h1> :
          <div className='answercss'>
            {text.split("").map((letter, i) =>
            (
              <h1 className='placeholder'>
                <span key={i} className={`letter ${answer.includes(letter) === true ? 'active' : 'hidden'}`}>{letter}</span>
              </h1>

            ))}
          </div>}
      </div>
      <div className='keyboard'>
        {words.map((w, i) => (
          <button key={i} disabled={count === "hangman" ? true :
            WrongAnswer.includes(w) === true ? true : false} className={`button ${WrongAnswer.includes(w) === true ? "wrong" : ""} ${answer.includes(w) === true ? "right" : ''}`} onClick={(e) => handelSolve(e)} value={w}>{w}</button>
        ))}
      </div>
      <button className="Start" onClick={() => handelStartover()}>Start over</button>
      <button className="Show" onClick={() => handelShow()}>Show Answer</button>
    </div>
  )
}

export default App
