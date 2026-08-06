# Judge-My-Restaurant
redicts restaurant ratings using Machine Learning with feature engineering, label encoding, cuisine transformation (MultiLabelBinarizer), and regression models. Compares Linear Regression, Decision Tree, and Random Forest, selecting the best-performing model based on evaluation metrics.


🍽️ Restaurant Rating Prediction System 




📌 Overview

This project predicts restaurant ratings using Machine Learning based on restaurant attributes such as location, cuisines, pricing, online delivery, table booking, and customer votes.

Unlike the deployment-ready version that uses a single Scikit-learn Pipeline, this implementation follows the traditional machine learning workflow, where preprocessing, feature engineering, and prediction are performed as separate steps.



🚀 Features
Restaurant rating prediction
Multiple regression models
Feature engineering
Cuisine encoding using MultiLabelBinarizer
Label encoding for categorical variables
Model comparison and evaluation
Model serialization using Joblib
🧠 Machine Learning Workflow
Dataset
   │
   ▼
Data Cleaning
   │
   ▼
Feature Engineering
   │
   ▼
Label Encoding
   │
   ▼
Cuisine Encoding
   │
   ▼
Train-Test Split
   │
   ▼
Model Training
   │
   ▼
Model Evaluation
   │
   ▼
Save Model (.pkl)
📊 Models Implemented
Linear Regression
Decision Tree Regressor
Random Forest Regressor


Performance

Model	R² Score
Linear Regression	0.5123
Decision Tree	0.5314
Random Forest	0.6543




Random Forest achieved the highest prediction accuracy and was selected as the final model.

 Technologies Used
Python
Pandas
NumPy
Scikit-learn
Matplotlib
Joblib
Jupyter Notebook


 Project Structure
Restaurant-Rating-Prediction/
│
├── data/
│   └── zomato.csv
│
├── notebooks/
│   └── Restaurant_Rating.ipynb
│
├── models/
│   ├── random_forest_model.pkl
│   ├── city_encoder.pkl
│   ├── currency_encoder.pkl
│   └── yes_no_encoder.pkl
│
├── images/
│
└── README.md
🔄 Traditional Deployment Workflow

Since preprocessing is not embedded inside the model, deployment requires performing every preprocessing step manually before making predictions.

User Input
      │
      ▼
Encode City
      │
      ▼
Encode Currency
      │
      ▼
Encode Yes/No Features
      │
      ▼
Transform Cuisines
      │
      ▼
Create Feature Vector
      │
      ▼
Random Forest Model
      │
      ▼
Predicted Rating
📌 Limitations

This project follows the classic machine learning approach, where preprocessing logic is maintained separately from the trained model. As a result:

All encoders must be saved and loaded independently.
The cuisine transformation must be repeated manually during inference.
Training and deployment code must stay synchronized to avoid mismatches.
Integrating the model into web applications requires additional preprocessing code.
 Future Improvements

The next version of this project adopts a Scikit-learn Pipeline to package preprocessing and the trained model into a single deployable artifact. This simplifies deployment, reduces preprocessing errors, and makes the solution easier to integrate with backend services such as FastAPI.

This README clearly documents the traditional ML workflow, while naturally setting up your next repository (the pipeline-based version) as the improved, production-ready evolution of the project.

