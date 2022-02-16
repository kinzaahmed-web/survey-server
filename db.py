from contextlib import contextmanager
import logging
import os

from flask import current_app, g

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

# def add_survey (name):
#     # Since we're using connection pooling, it's not as big of a deal to have
#     # lots of short-lived cursors (I think -- worth testing if we ever go big)
#     with get_db_cursor(True) as cur:
#         current_app.logger.info("Adding person %s", name)
#         cur.execute("INSERT INTO person (name) values (%s)", (name,))

def get_survey_results(page = 0, surveys_per_page = 10):
    limit = surveys_per_page
    offset = page*surveys_per_page
    with get_db_cursor() as cur:
        cur.execute("select * from this_or_that order by survey_id limit %s offset %s", (limit, offset))
        return cur.fetchall()