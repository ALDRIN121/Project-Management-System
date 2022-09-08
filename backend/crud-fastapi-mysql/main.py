from fastapi import FastAPI
from schemas.schemas import Login
from config.db import con
from models.index import login
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
        username=body.username,
        github=body.github,
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

# # edit data
# @app.patch('/api/students/{id}')
# async def edit_data(id:int):
#     data=con.execute(students.select().where(students.c.id==id)).fetchall()
#     return {
#         "success": True,
#         "data":data
#     }

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
