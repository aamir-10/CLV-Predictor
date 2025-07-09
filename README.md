# 💰 Customer Lifetime Value Predictor

An **AI-powered** web application that helps businesses estimate the **potential lifetime value** of a customer based on purchase history, frequency, and behavioral patterns. Built using **Flask** for the backend and HTML/CSS/JavaScript for the frontend, it utilizes an **XGBoost** machine learning model trained on real-world retail data to generate actionable business insights.

![Homepage](Snapshots/hero.png)

## ✨ Features

- 🤖 Predict customer CLV using machine learning (XGBoost)  
- 🧾 Input form to enter transactional data  
- 📊 Visualize key customer metrics like **Recency**, **Frequency**, and **Spend**  
- 💻 Responsive and modern UI built with **HTML, CSS, and JavaScript**

### 🧠 CLV Prediction Form
![Dashboard](Snapshots/form.png)

-  Interactive form and real-time prediction results

### 📌 Key Metrics Explained

- ⏱️ **Recency**: Days since last purchase  
- 🔁 **Frequency**: Number of purchases made  
- 💸 **Monetary Value**: Total spend etc...

![Metrics](Snapshots/footer.png)

---

### 🛠️ Tech Stack

- 🧩 **Frontend**: HTML, CSS, JavaScript  
- 🐍 **Backend**: Flask (Python)  
- 📈 **Model**: XGBoost (trained on Online Retail dataset)

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/aamir-10/CustomerLifetimeValuePredictor.git
cd CustomerLifetimeValuePredictor
```

### 2️⃣ Setup Environment

```bash
pip install -r requirements.txt
```

### 3️⃣ Run the App

```bash
python app.py
```

---

## ☁️ Deployment

This app has been deployed on **Render** using **Gunicorn**.

### ✅ Start Command (for production)

```bash
gunicorn app:app
```

---

## 🌐 Live Demo

Try the live app here: 👉 [CLV Predictor Live](https://clv-predictor.onrender.com/)

---
