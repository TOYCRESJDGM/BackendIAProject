import pickle
import sklearn

def load_model():
    with open('./model/web.pkl', 'rb') as archivo:
        base_model = pickle.load(archivo)
    
    return base_model