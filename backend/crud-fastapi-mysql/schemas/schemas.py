from pydantic import BaseModel

class Login(BaseModel):
    username:str
    useremail:str
    github:str
    githubaccount:str
    password:str

class LocalRepo(BaseModel):
    userID: int
    name:str
    experience:str
    duration:str
    effort:str
    entities:str
    functions:str
    projectStatus:str

class Task(BaseModel):
    userID:int
    name:str
    task:str
    dueDate:str
    status: str         

class Issue(BaseModel):
    userID:int
    name:str
    description:str
    issueType: str

class Shedule(BaseModel):
    userID: int
    name: str
    shedule:str

class AIModal(BaseModel):
    experience:str
    duration:str
    entities:str
    functions:str

class Email(BaseModel):
    userEmail:str
    name:str