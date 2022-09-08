from sqlalchemy import create_engine,MetaData
engine=create_engine('mysql+pymysql://root:root@localhost:3306/project')
meta=MetaData()
con=engine.connect()