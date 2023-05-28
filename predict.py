import pickle
import sys
from app import predict
import warnings
import json
warnings.filterwarnings("ignore", category=UserWarning)

model = pickle.load(open('flight_rf.pkl', 'rb'))

temp = sys.argv[1]
features = predict(temp)
prob = model.predict(features)
X = round(prob[0], 2)
# X = temp

print(X)