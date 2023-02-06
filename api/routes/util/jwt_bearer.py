
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from util.jwt_handler import decodeJWT, decode_auth_code_JWT


class jwtBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(jwtBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(jwtBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(
                    status_code=403, detail="Invalid or Expired Token")
            if self.verify_jwt(credentials.credentials):
                return credentials.credentials
            raise HTTPException(
                status_code=403, detail="Invalid or Expired Token")

        else:
            raise HTTPException(
                status_code=403, detail="Invalid or Expired Token")

    def verify_jwt(self, jwt_token: str):
        isTokenValid: bool = False
        payload = decodeJWT(jwt_token)
        if payload:

            isTokenValid = True
        if "error" in payload.keys():
            isTokenValid = False
            
        return isTokenValid

class jwtFormBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(jwtFormBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(jwtFormBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(
                    status_code=403, detail="Invalid or Expired Token")
            if self.verify_form_jwt(credentials.credentials):
                print(credentials.credentials)
                return credentials.credentials
            raise HTTPException(
                status_code=403, detail="Invalid or Expired Token")

        else:
            raise HTTPException(
                status_code=403, detail="Invalid or Expired Token")

    def verify_form_jwt(self, jwt_token: str):
        isTokenValid: bool = False
        
        payload = decode_auth_code_JWT(jwt_token)
        

        if payload:
            isTokenValid = True
            
        if "error" in payload.keys():
            isTokenValid = False
        
        return isTokenValid
