// Trigger fade-in animation when page loads
window.addEventListener('load', () => {
    const heroCard = document.getElementById('heroCard');
    if (heroCard) {
        heroCard.classList.add('show');
    }
});

document.getElementById('clv-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => data[key] = value);

  const response = await fetch('/predict', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });

  const resultDiv = document.getElementById('result');
  const result = await response.json();

  if (result.prediction !== undefined) {
    resultDiv.innerHTML = `Predicted CLV: ₹ <strong>${parseFloat(result.prediction).toFixed(2)}</strong>`;
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' }); 
  } else {
    resultDiv.innerHTML = `❌ Error: ${result.error}`;
    resultDiv.style.display = 'block';
    resultDiv.style.color = '#b30000';
  }
});


window.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    once: true
  });
});
