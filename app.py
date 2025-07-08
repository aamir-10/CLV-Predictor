from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np
from datetime import datetime

app = Flask(__name__)
model = joblib.load('model/xgb_model.pkl')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    try:
        # Extract data
        first_purchase = datetime.strptime(data['first_purchase'], "%Y-%m-%d")
        last_purchase = datetime.strptime(data['last_purchase'], "%Y-%m-%d")
        total_orders = int(data['total_orders'])
        total_quantity = int(data['total_quantity'])
        total_spend = float(data['total_spend'])
        country = data['country']

        # Derived features
        today = datetime.today()
        recency = (today - last_purchase).days
        frequency = total_orders
        total_transactions = total_orders
        avg_quantity = total_quantity / total_orders if total_orders > 0 else 0
        avg_basket_value = total_spend / total_orders if total_orders > 0 else 0
        avg_days_between = (last_purchase - first_purchase).days / (total_orders - 1) if total_orders > 1 else 0
        country_code = hash(country) % 100

        features = np.array([[recency, frequency, total_transactions, total_quantity,
                              avg_quantity, avg_basket_value, avg_days_between, country_code]])
        prediction = model.predict(features)[0]

        return jsonify({'prediction': float(round(prediction, 2))})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run()
