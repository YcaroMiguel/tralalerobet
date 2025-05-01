const images = [
    "img1.png", // ex: estrela.png
    "img2.png", // ex: cereja.png
    "img3.png", // ex: sete.png
  ];
  
  function getRandomSymbol() {
    return images[Math.floor(Math.random() * images.length)];
  }
  
  function spinReel(reelId, finalSymbol) {
    const reel = document.getElementById(reelId);
    reel.innerHTML = ""; // limpar
  
    const container = document.createElement("div");
    container.classList.add("spin-container");
  
    // Simular rotação com 3 símbolos aleatórios + o final
    for (let i = 0; i < 3; i++) {
      const img = document.createElement("img");
      img.src = getRandomSymbol();
      container.appendChild(img);
    }
  
    const finalImg = document.createElement("img");
    finalImg.src = finalSymbol;
    container.appendChild(finalImg);
  
    reel.appendChild(container);
  }
  
  function spinReels() {
    const bet = parseInt(document.getElementById("betAmount").value);
  
    if (coins < bet) {
      alert("Saldo insuficiente!");
      return;
    }
  
    coins -= bet;
    updateCoinsDisplay();
  
    const result = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
  
    spinReel("reel1", result[0]);
    spinReel("reel2", result[1]);
    spinReel("reel3", result[2]);
  
    const resultText = document.getElementById("result");
  
    setTimeout(() => {
      if (result[0] === result[1] && result[1] === result[2]) {
        const winAmount = bet * 5;
        coins += winAmount;
        resultText.textContent = `🎉 Você ganhou ${winAmount} moedas!`;
      } else {
        resultText.textContent = "Tente novamente!";
      }
  
      updateCoinsDisplay();
  
      // Desativar botão se ficar sem moedas
      if (coins <= 0) {
        document.getElementById("spinButton").disabled = true;
        resultText.textContent = "💸 Sem moedas! Reinicie o jogo.";
      }
    }, 800);
  }
  
  
  document.getElementById("spinButton").addEventListener("click", spinReels);

  let coins = 1000;

function updateCoinsDisplay() {
  document.getElementById("coins").textContent = coins;
}
