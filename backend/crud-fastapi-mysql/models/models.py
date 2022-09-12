from config.db import meta
from sqlalchemy import Table,Column
from sqlalchemy.sql.sqltypes import Integer,String


login=Table(
    'login',meta,
    Column('id',Integer,primary_key=True),
    Column('username',String(255)),
    Column('useremail',String(255)),
    Column('github',String(255)),
    Column('githubID',String(255)),
    Column('password',String(255))
)
localrepo=Table(
    'localrepo',meta,
    Column('id',Integer,primary_key=True),
    Column('userID',Integer),
    Column('name',String(255)),
    Column('experience',String(255)),
    Column('duration',String(255)),
    Column('effort',String(255)),
    Column('entities',String(255)),
    Column('functions',String(255)),
    Column('projectStatus',String(255)),
)

task=Table(
    'task',meta,
    Column('id',Integer,primary_key=True),
    Column('userID',Integer),
    Column('name',String(255)),
    Column('task',String(255)),
    Column('dueDate',String(255)),
    Column('status',String(255)),
)

issue=Table(
    'issue',meta,
    Column('id',Integer,primary_key=True),
    Column('userID',Integer),
    Column('name',String(255)),
    Column('description',String(255)),
    Column('issueType',String(255)),
)

shedule=Table(
    'shedule',meta,
    Column('id',Integer,primary_key=True),
    Column('userID',Integer),
    Column('name',String(255)),
    Column('shedule',String(255)),
)
