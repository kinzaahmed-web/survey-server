from contextlib import contextmanager
import logging
import os

from flask import current_app, g, jsonify

import psycopg2
from psycopg2.pool import ThreadedConnectionPool
from psycopg2.extras import DictCursor

pool = None

def setup():
    global pool
    DATABASE_URL = os.environ['DATABASE_URL']
    current_app.logger.info(f"creating db connection pool")
    pool = ThreadedConnectionPool(1, 4, dsn=DATABASE_URL, sslmode='require')


@contextmanager
def get_db_connection():
    try:
        connection = pool.getconn()
        yield connection
    finally:
        pool.putconn(connection)


@contextmanager
def get_db_cursor(commit=False):
    with get_db_connection() as connection:
      cursor = connection.cursor(cursor_factory=DictCursor)
      # cursor = connection.cursor()
      try:
          yield cursor
          if commit:
              connection.commit()
      finally:
          cursor.close()

def add_survey(survey):
    # Since we're using connection pooling, it's not as big of a deal to have
    # lots of short-lived cursors (I think -- worth testing if we ever go big)
    with get_db_cursor(True) as cur:
        current_app.logger.info("Adding survey response from %s", survey['surveyor_name'])
        cur.execute("""INSERT INTO this_or_that (
                                                    surveyor_name, 
                                                    completion_date, 
                                                    more_time_money, 
                                                    headache, 
                                                    cereal, 
                                                    entertainment, 
                                                    comic, 
                                                    pc, 
                                                    keyboard
                                                ) values (%s, %s, %s, %s, %s, %s, %s, %s, %s)""", 
                                                (
                                                    survey['surveyor_name'], 
                                                    survey['completion_date'], 
                                                    survey['more_time_money'], 
                                                    survey['headache'], 
                                                    survey['cereal'], 
                                                    survey['entertainment'], 
                                                    survey['comic'], 
                                                    survey['pc'], 
                                                    survey['keyboard']
                                                )
                    )

def get_survey_results(reverse, page = 0, surveys_per_page = 10):
    limit = surveys_per_page
    offset = page*surveys_per_page
    with get_db_cursor() as cur:
        if reverse:
            cur.execute("SELECT * FROM this_or_that ORDER BY completion_date DESC limit %s offset %s", (limit, offset))
        else:
            cur.execute("SELECT * FROM this_or_that ORDER BY completion_date ASC limit %s offset %s", (limit, offset))
        results = [{
                    'id': record[0],
                    'surveyor_name': record[1],
                    'completion_date': record[2],
                    'more_time_money': record[3],
                    'headache': record[4],
                    'cereal': record[5],
                    'entertainment': record[6],
                    'comic': record[7],
                    'pc': record[8],
                    'keyboard': record[9],
                    'suggest': record[10]} for record in cur]
        return results
