let coins = 1000; // Moedas do jogador
let betAmount = 10; // Valor inicial da aposta

function updateCoinsDisplay() {
  document.getElementById("coins").textContent = coins;
}

// Função para gerar a cor da roleta
function getColor(number) {
  if (number === 0) return "verde";
  return number % 2 === 0 ? "preto" : "vermelho";
}

// Função para girar a roleta
function spinRoulette() {
  const betNumber = parseInt(document.getElementById("betNumber").value);
  const betColor = document.getElementById("betColor").value;
  const bet = parseInt(document.getElementById("betAmount").value);

  if (coins < bet) {
    alert("Saldo insuficiente!");
    return;
  }

  // Atualiza o saldo após aposta
  coins -= bet;
  updateCoinsDisplay();

  // Gira a roleta (número aleatório entre 0 e 36)
  const resultNumber = Math.floor(Math.random() * 37);
  const resultColor = getColor(resultNumber);

  // Exibe o resultado da roleta
  const resultText = document.getElementById("roulette-result");
  resultText.innerHTML = `Resultado: ${resultNumber} (${resultColor})`;

  // Verifica se o jogador ganhou
  if (betNumber === resultNumber) {
    coins += bet * 36; // Pagamento do número
    resultText.innerHTML += `<br>Você ganhou ${bet * 36} moedas!`;
  } else if (betColor === resultColor) {
    coins += bet * 2; // Pagamento da cor
    resultText.innerHTML += `<br>Você ganhou ${bet * 2} moedas!`;
  } else {
    resultText.innerHTML += `<br>Você perdeu! Tente novamente.`;
  }

  // Atualiza o saldo
  updateCoinsDisplay();

  // Desabilita o botão de girar se o saldo for 0
  if (coins <= 0) {
    document.getElementById("spinButton").disabled = true;
    resultText.innerHTML = "Você ficou sem moedas!";
  }
}

document.getElementById("spinButton").addEventListener("click", spinRoulette);

// Atualiza o saldo quando a página é carregada
updateCoinsDisplay();
