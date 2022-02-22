DROP TABLE IF EXISTS this_or_that;

CREATE TABLE this_or_that (
    survey_id SERIAL PRIMARY KEY,
    surveyor_name varchar(255) NOT NULL,
    completion_date TIMESTAMP NOT NULL,
    more_time_money varchar(255) NOT NULL,
    headache varchar(255) NOT NULL,
    cereal varchar(255) NOT NULL,
    entertainment varchar(255) NOT NULL,
    comic varchar(255) NOT NULL,
    pc varchar(255) NOT NULL,
    keyboard varchar(255) NOT NULL,
    suggest TEXT
);

INSERT INTO this_or_that(
                            surveyor_name, 
                            completion_date, 
                            more_time_money, 
                            headache, 
                            cereal, 
                            entertainment, 
                            comic, 
                            pc, 
                            keyboard,
                            suggest
                        ) values (
                            'Kinza Ahmed', 
                            'Fri, 18 Feb 2022', 
                            'more time because money can not buy you time',
                            'tylenol',
                            'yes',
                            'both',
                            'marvel',
                            'laptop',
                            'mechanical keyboard',
                            ''
                            );