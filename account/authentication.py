import jwt, datetime
from rest_framework import exceptions


def createAccessToken(id):
    return jwt.encode({
        'user_id': id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=30),
        'iat': datetime.datetime.utcnow()
    }, 'access_secret', algorithm='HS256')
    
def decode_access_token(token):
    try:
        payload = jwt.decode(token, 'access_secret', algorithms='HS256')
        
        return payload['user_id']
        
    except Exception as e:
        print(e)
        raise exceptions.AuthenticationFailed('unauthenticated')
    
def createRefreshToken(id):
    return jwt.encode({
        'user_id': id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=5),
        'iat': datetime.datetime.utcnow()
    }, 'refresh_secret', algorithm='HS256')
    

def decode_refresh_token(token):
    try:
        payload = jwt.decode(token, 'refresh_secret', algorithms='HS256')
        
        return payload['user_id']
        
    except Exception as e:
        print(e)
        raise exceptions.AuthenticationFailed('unauthenticated')