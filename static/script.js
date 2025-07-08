// Hero Fade-In Animation
window.addEventListener('load', () => {
  const heroCard = document.getElementById('heroCard');
  if (heroCard) {
    heroCard.classList.add('show');
  }
});

// CLV Prediction Form Submission
document.getElementById('clv-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const resultDiv = document.getElementById('result');
  resultDiv.style.display = 'none'; // Hide result box before validation

  // Get form values
  const firstPurchase = new Date(this.first_purchase.value);
  const lastPurchase = new Date(this.last_purchase.value);
  const totalOrders = parseInt(this.total_orders.value);
  const totalQuantity = parseInt(this.total_quantity.value);
  const totalSpend = parseFloat(this.total_spend.value);
  const country = this.country.value;


  // Validate dates
  if (isNaN(firstPurchase.getTime()) || isNaN(lastPurchase.getTime())) {
    showError("Please enter valid dates.");
    return;
  }

  if (lastPurchase <= firstPurchase) {
    showError("Last Purchase Date must be after First Purchase Date.");
    return;
  }

  // Validate numbers
  if (isNaN(totalOrders) || totalOrders < 1) {
    showError("Total Orders must be at least 1.");
    return;
  }

  if (isNaN(totalQuantity) || totalQuantity < 1) {
    showError("Total Quantity Purchased must be at least 1.");
    return;
  }

  if (isNaN(totalSpend) || totalSpend <= 0) {
    showError("Total Spend must be a positive number.");
    return;
  }

  // Validate country
  if (!country) {
    showError("Please select a country.");
    return;
  }

  // If validation passes, prepare data
  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => data[key] = value);

  try {
    const response = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.prediction !== undefined) {
      resultDiv.innerHTML = `✅ Predicted CLV: ₹ <strong>${parseFloat(result.prediction).toFixed(2)}</strong>`;
      resultDiv.style.backgroundColor = '#d4edda';
      resultDiv.style.color = '#155724';
      resultDiv.style.borderLeft = '6px solid #28a745';
      resultDiv.style.display = 'block';
      resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      showError(result.error || "Something went wrong.");
    }

  } catch (error) {
    showError("❌ Request failed. Please try again.");
  }
});
// Limit the date inputs to today or earlier
window.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  document.querySelector('input[name="first_purchase"]').setAttribute('max', today);
  document.querySelector('input[name="last_purchase"]').setAttribute('max', today);
});


// Reusable Error Display
function showError(message) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `❌ ${message}`;
  resultDiv.style.backgroundColor = '#f8d7da';
  resultDiv.style.color = '#721c24';
  resultDiv.style.borderLeft = '6px solid #dc3545';
  resultDiv.style.display = 'block';
  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}


// AOS Initialization
window.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    once: true
  });
});
