from pydantic import BaseModel

class Login(BaseModel):
    username:str
    github:str
    password:str