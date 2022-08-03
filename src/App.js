import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]

function App() {
  const [Cards, setCards] = useState([]);
  const [Turns, setTurns] = useState(0);

  const [ChoiceOne, setChoiceOne] = useState(null);
  const [ChoiceTwo, setChoiceTwo] = useState(null);

  const [Disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [ ...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  // handle a choice
  const handleChoice = (card) => {
    ChoiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // compare 2 selected cards
  useEffect(() => {
    if(ChoiceOne && ChoiceTwo){
      setDisabled(true);
      if(ChoiceOne.src === ChoiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === ChoiceOne.src){
              return {...card, matched: true};
            }else{
              return card;
            }
          });
        });
        resetTurn();
      }else{
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [ ChoiceOne, ChoiceTwo ]);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  // start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {Cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === ChoiceOne || card === ChoiceTwo || card.matched}
            disabled={Disabled}
          />
        ))}
      </div>
      <p>Turns : {Turns}</p>
    </div>
  );
}

export default App;
