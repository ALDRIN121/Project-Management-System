from curses.ascii import EM
from multiprocessing import BoundedSemaphore
from fastapi import FastAPI
from schemas.schemas import Login,LocalRepo,Task,Issue,Shedule,AIModal,Email
from config.db import con
from models.index import login,localrepo,task,issue,shedule
from fastapi.middleware.cors import CORSMiddleware
import pickle
import random
import smtplib
from email.message import EmailMessage

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# best way to make api
@app.get('/api/login')
async def index():
    data=con.execute(login.select()).fetchall()
    return {
        "success": True,
        "data":data
    }   

# insert data
@app.post('/api/register')
async def store(body:Login):
    data=con.execute(login.insert().values(
        username = body.username,
        useremail=body.useremail,
        github=body.github,
        githubID=body.githubaccount,
        password=body.password,
    ))

    if data.is_insert:
        return {
            "success": True,
            "msg":"Data Store Successfully"
        }
    else:
         return {
            "success": False,
            "msg":"Some Problem"
        }


@app.post('/api/localRepo')
async def store(body:LocalRepo):
    data=con.execute(localrepo.insert().values(
        userID = body.userID,
        name = body.name,
        experience = body.experience, 
        duration = body.duration, #lenght
        effort = body.effort,
        entities = body.entities, #done
        functions = body.functions, #done
        projectStatus= body.projectStatus
    ))

    if data.is_insert:
        return {
            "success": True,
            "msg":"Data Store Successfully"
        }
    else:
         return {
            "success": False,
            "msg":"Some Problem"
        }


@app.post('/api/localRepoAI')
async def store(body:AIModal):
    filename = 'project.sav'
    loaded_model = pickle.load(open(filename, 'rb'))
    pontadjust = int(body.functions) + random.randint(0,3)
    vec = [[int(body.duration),int(body.experience),int(body.entities),int(body.functions),pontadjust]]
    data = loaded_model.predict(vec)[0]
    return {
        "success": True,
        "data":data
    }


@app.post('/api/email')
async def index(body:Email):
    email_address = "dreamsachived@gmail.com"
    email_password = "gkvjwhrwcqbqhxps"

# create email
    msg = EmailMessage()
    msg['Subject'] = "Reminder Email for" + body.name
    msg['From'] = email_address
    msg['To'] = body.userEmail
    msg.set_content("This is an email is a reminder for checking on your project " + body.name)

# send email
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(email_address, email_password)
        smtp.send_message(msg)


@app.get('/api/getEmial/{id}')
async def index(id:int):
    data=con.execute(login.select().where(login.c.id==id)).fetchall()  
    return {
        "success": True,
        "data":data
    }


@app.get('/api/localRepo/{id}')
async def index(id:int):
    data=con.execute(localrepo.select().where(localrepo.c.userID==id)).fetchall()
    return {
        "success": True,
        "data":data
    }

@app.post('/api/task')
async def store(body:Task):
    data=con.execute(task.insert().values(
        userID = body.userID,
        name = body.name,
        task = body.task,
        dueDate = body.dueDate,
        status = body.status,
    ))

    if data.is_insert:
        return {
            "success": True,
            "msg":"Data Store Successfully"
        }
    else:
         return {
            "success": False,
            "msg":"Some Problem"
        }

@app.post('/api/issue')
async def store(body:Issue):
    data=con.execute(issue.insert().values(
        userID = body.userID,
        name = body.name,
        description = body.description,
        issueType = body.issueType,
    ))

    if data.is_insert:
        return {
            "success": True,
            "msg":"Data Store Successfully"
        }
    else:
         return {
            "success": False,
            "msg":"Some Problem"
        }

@app.get('/api/issue/{id}')
async def index(id:int):
    data=con.execute(issue.select().where(issue.c.userID==id)).fetchall()
    return {
        "success": True,
        "data":data
    }

@app.get('/api/task/{id}')
async def index(id:int):
    data=con.execute(task.select()).fetchall()
    return {
        "success": True,
        "data":data
    }
    
# update data

@app.put('/api/login/{id}')
async def change(body:Login,id:int):

    data=con.execute(login.update().values(
        username = body.username,
        useremail=body.useremail,
        github=body.github,
        githubID=body.githubaccount,
        password=body.password,
    ).where(login.c.id==id))
    if data:
        return {
            "success": True,
            "msg":"Data Update Successfully"
        }
    else:
         return {
            "success": False,
            "msg":"Some Problem"
        }



# edit data
@app.patch('/api/login/{id}')
async def edit_data(id:int):
    data=con.execute(login.select().where(login.c.id==id)).fetchall()
    return {
        "success": True,
        "data":data
    }

@app.get('/api/shedule/{id}')
async def edit_data(id:int):
    data=con.execute(shedule.select().where(shedule.c.userID==id)).fetchall()
    return {
        "success": True,
        "data":data
    }



@app.post('/api/shedule')
async def store(body:Shedule):
    data=con.execute(shedule.insert().values(
        userID = body.userID,
        name = body.name,
        shedule = body.shedule,
    ))

    if data.is_insert:
        return {
            "success": True,
            "msg":"Data Store Successfully"
        }
    else:
         return {
            "success": False,
            "msg":"Some Problem"
        }


@app.put('/api/shedule/{id}')
async def change(body:Shedule,id:int):

    data=con.execute(shedule.update().values(
       userID = body.userID,
        name = body.name,
        shedule = body.shedule,
    ).where(shedule.c.id==id))
    if data:
        return {
            "success": True,
            "msg":"Data Update Successfully"
        }
    else:
         return {
            "success": False,
            "msg":"Some Problem"
        }


# delete data
@app.delete('/api/shedule/{id}')
async def delete(id:int):
    data=con.execute(shedule.delete().where(shedule.c.id==id))
    if data:
        return {
            "success": True,
            "msg":"Data Delete Successfully"
        }
    else:
         return {
            "success": False,
            "msg":"Some Problem"
        }

@app.put('/api/localRepo/{id}')
async def change(body:LocalRepo,id:int):

    data=con.execute(localrepo.update().values(
        userID = body.userID,
        name = body.name,
        experience = body.experience,
        duration = body.duration,
        effort = body.effort,
        entities = body.entities,
        functions = body.functions,
        projectStatus= body.projectStatus
    ).where(localrepo.c.id==id))
    if data:
        return {
            "success": True,
            "msg":"Data Update Successfully"
        }
    else:
         return {
            "success": False,
            "msg":"Some Problem"
        }

@app.delete('/api/localRepo/{id}')
async def delete(id:int):
    data=con.execute(localrepo.delete().where(localrepo.c.id==id))
    if data:
        return {
            "success": True,
            "msg":"Data Delete Successfully"
        }
    else:
         return {
            "success": False,
            "msg":"Some Problem"
        }

@app.put('/api/issue/{id}')
async def change(body:Issue,id:int):

    data=con.execute(issue.update().values(
         userID = body.userID,
        name = body.name,
        description = body.description,
        issueType = body.issueType,
    ).where(issue.c.id==id))
    if data:
        return {
            "success": True,
            "msg":"Data Update Successfully"
        }
    else:
         return {
            "success": False,
            "msg":"Some Problem"
        }

@app.delete('/api/issue/{id}')
async def delete(id:int):
    data=con.execute(issue.delete().where(issue.c.id==id))
    if data:
        return {
            "success": True,
            "msg":"Data Delete Successfully"
        }
    else:
         return {
            "success": False,
            "msg":"Some Problem"
        }

@app.put('/api/task/{id}')
async def change(body:Task,id:int):

    data=con.execute(task.update().values(
        userID = body.userID,
        name = body.name,
        task = body.task,
        dueDate = body.dueDate,
        status = body.status,
    ).where(task.c.id==id))
    if data:
        return {
            "success": True,
            "msg":"Data Update Successfully"
        }
    else:
         return {
            "success": False,
            "msg":"Some Problem"
        }

@app.delete('/api/task/{id}')
async def delete(id:int):
    data=con.execute(task.delete().where(task.c.id==id))
    if data:
        return {
            "success": True,
            "msg":"Data Delete Successfully"
        }
    else:
         return {
            "success": False,
            "msg":"Some Problem"
        }




@app.get('/admin/api/localRepo')
async def index():
    data=con.execute(localrepo.select()).fetchall()
    return {
        "success": True,
        "data":data
    }  


@app.get('/admin/api/issue')
async def index():
    data=con.execute(issue.select()).fetchall()
    return {
        "success": True,
        "data":data
    }   

@app.get('/admin/api/task')
async def index():
    data=con.execute(task.select()).fetchall()
    return {
        "success": True,
        "data":data
    } 

@app.get('/admin/api/shedule')
async def index():
    data=con.execute(shedule.select()).fetchall()
    return {
        "success": True,
        "data":data
    } 

@app.delete('/api/login/{id}')
async def delete(id:int):
    data=con.execute(login.delete().where(login.c.id==id))
    if data:
        return {
            "success": True,
            "msg":"Data Delete Successfully"
        }
    else:
         return {
            "success": False,
            "msg":"Some Problem"
        }
# # update data

# @app.put('/api/students/{id}')
# async def update(id:int,student:Student):
#     data=con.execute(students.update().values(
#         name=student.name,
#         email=student.email,
#         age=student.age,
#         country=student.country,
#     ).where(students.c.id==id))
#     if data:
#         return {
#             "success": True,
#             "msg":"Student Update Successfully"
#         }
#     else:
#          return {
#             "success": False,
#             "msg":"Some Problem"
#         }

# # delete data
# @app.delete('/api/students/{id}')
# async def delete(id:int):
#     data=con.execute(students.delete().where(students.c.id==id))
#     if data:
#         return {
#             "success": True,
#             "msg":"Student Delete Successfully"
#         }
#     else:
#          return {
#             "success": False,
#             "msg":"Some Problem"
#         }

# # search data

# @app.get('/api/students/{search}')
# async def search(search):
#     data=con.execute(students.select().where(students.c.name.like('%'+search+'%'))).fetchall()
#     return {
#         "success": True,
#         "data":data
#     }
