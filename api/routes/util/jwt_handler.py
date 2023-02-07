# File responsible for signing, encoding, decoding and return JWT's
import time
import datetime
import jwt
from decouple import config


USER_JWT_SECRET = config('user_secret_key')
AUTH_JWT_SECRET = config('auth_code_secret')
JWT_ALGORITHIM = config('algorithm')




USER_EXP_MINUTES = 60
AUTH_CODE_EXP_MINUTES = 720

# Returns generated tokens


def token_response(token: str):
    return {
        "token": token
    }

# Function used for signing the JWT string for user
def sign_JWT(userID: str):
    payload = {
        "userID": userID,
        "userExpiry": time.time() + (USER_EXP_MINUTES * 60)

    }
    token = jwt.encode(payload, USER_JWT_SECRET, algorithm=JWT_ALGORITHIM)
    return token_response(token)

# Function used for signing the JWT string for form access
def auth_submitter(accesCode: str):
    payload = {
        "accesCode": accesCode,
        "formExpiry": time.time() + (AUTH_CODE_EXP_MINUTES * 60)

    }
    
    token = jwt.encode(payload, AUTH_JWT_SECRET, algorithm=JWT_ALGORITHIM)
    return token_response(token)
# Decode token for form submission access
def decode_auth_code_JWT(token):
    try:
        decode_token = jwt.decode(
            token, AUTH_JWT_SECRET, algorithms=[JWT_ALGORITHIM])
        return decode_token if decode_token['formExpiry'] >= time.time() else {"error": "Unable to verify token"}
    except:
        return {"error": "Unable to verify auth code"}

# Decode token for user access
def decodeJWT(token: str):
    try:
        decode_token = jwt.decode(
            token, USER_JWT_SECRET, algorithms=[JWT_ALGORITHIM])


        return decode_token if decode_token['userExpiry'] >= time.time() else {"error": "Unable to verify token"}
    except:
        return {"error": "Unable to verify sign in"}


