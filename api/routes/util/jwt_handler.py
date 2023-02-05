# File responsible for signing, encoding, decoding and return JWT's
import time
import datetime
import jwt
from decouple import config


JWT_SECRET = config('secret_key')
JWT_ALGORITHIM = config('algorithm')


EXPIRATION_MINUTES = 30

# Returns generated tokens


def token_response(token: str):
    return {
        "access token": token
    }

# Function used for signing the JWT string


def sign_JWT(userID: str):
    payload = {
        "userID": userID,
        "expiry": time.time() + (EXPIRATION_MINUTES * 60)

    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHIM)
    return token_response(token)


def auth_submitter(accesCode: str):
    payload = {
        "accesCode": accesCode,
        "expiry": time.time() + (EXPIRATION_MINUTES * 60)

    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHIM)
    return token_response(token)


def decodeJWT(token: str):
    try:
        decode_token = jwt.decode(
            token, JWT_SECRET, algorithms=[JWT_ALGORITHIM])
        # print(decode_token)
        # if decode_token['expiry'] >= time.time():
        #     # print(time.time())

        return decode_token if decode_token['expiry'] >= time.time() else None
    except:
        return {"message": "Unable to verify sign in"}
