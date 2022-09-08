from config.db import meta
from sqlalchemy import Table,Column
from sqlalchemy.sql.sqltypes import Integer,String


login=Table(
    'login',meta,
    Column('id',Integer,primary_key=True),
    Column('username',String(255)),
    Column('github',String(255)),
    Column('password',String(255))
)