const words: string[] = ["MUNDO", "HOLA", "COMPUTADORA", "CELULAR", "CARRO"];

export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}
