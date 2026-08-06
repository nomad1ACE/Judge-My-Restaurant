from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.preprocessing import MultiLabelBinarizer
import pandas as pd


class CuisineTransformer(BaseEstimator, TransformerMixin):
    def __init__(self):
        self.mlb = MultiLabelBinarizer()

    def fit(self, X, y=None):
        cuisines = X.iloc[:, 0].tolist()
        self.mlb.fit(cuisines)
        return self

    def transform(self, X):
        cuisines = X.iloc[:, 0].tolist()

        encoded = self.mlb.transform(cuisines)

        return pd.DataFrame(
            encoded,
            columns=self.mlb.classes_,
            index=X.index
        )