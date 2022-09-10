from multiprocessing import BoundedSemaphore
from fastapi import FastAPI
from schemas.schemas import Login,LocalRepo,Task,Issue,Shedule
from config.db import con
from models.index import login,localrepo,task,issue,shedule
from fastapi.middleware.cors import CORSMiddleware
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
        duration = body.duration,
        effort = body.effort,
        entities = body.entities,
        functions = body.functions
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

@app.get('/api/issue')
async def index():
    data=con.execute(issue.select()).fetchall()
    return {
        "success": True,
        "data":data
    }

@app.get('/api/task')
async def index():
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
        functions = body.functions
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
