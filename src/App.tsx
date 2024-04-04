import { useEffect, useState } from "react";
import "./App.css";
import HangImage from "./components/HangImage";
import { letters } from "./helpers/letters";
import { getRandomWord } from "./helpers/getRandomWord";

function App() {
  const [word, setWord] = useState(getRandomWord());
  const [hiddenWord, setHiddenWord] = useState("_ ".repeat(word.length));
  const [attempts, setAttempts] = useState(0);
  const [loose, setLoose] = useState(false);
  const [won, setWon] = useState(false);

  /* Lógica si la persona pierde */
  useEffect(() => {
    if (attempts >= 9) {
      setLoose(true);
    }
  }, [attempts]);

  /* Lógica si la persona gana */
  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(" ").join("");
    if (currentHiddenWord === word) {
      setWon(true);
    }
  }, [hiddenWord, word]);

  const checkLetter = (letter: string) => {
    if (loose) return;
    if (won) return;

    if (!word.includes(letter)) {
      setAttempts(Math.min(attempts + 1, 9));
      return;
    }

    const hiddenWordArray = hiddenWord.split(" ");

    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(" "));
  };

  const newGame = () => {
    const newWord = getRandomWord();
    setWord(newWord);
    setHiddenWord("_ ".repeat(word.length));
    setAttempts(0);
    setLoose(false);
    setWon(false);
  };

  return (
    <div className="App">
      {/* Imágenes */}
      <HangImage imageNumber={attempts} />

      {/* Palabra Oculta  */}
      <h3>{hiddenWord}</h3>

      {/* Contador */}
      <h3>Intentos: {attempts}</h3>

      {/* Mensaje de Perdió */}
      {loose ? <h2>Perdió, la palabra era: {word}</h2> : ""}

      {/* Mensaje de Gano */}
      {won ? <h2>Felicidades</h2> : ""}

      {/* Botones de letras */}
      {letters.map((letter) => (
        <button key={letter} onClick={() => checkLetter(letter)}>
          {letter}
        </button>
      ))}
      <br />
      <br />
      <button onClick={newGame}>¿Nuevo Juego?</button>
    </div>
  );
}

export default App;
