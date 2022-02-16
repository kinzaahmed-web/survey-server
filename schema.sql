create table this_or_that (
    survey_id SERIAL PRIMARY KEY,
    surveyor_name varchar(255) NOT NULL,
    completion_date DATE NOT NULL,
    more_time_money varchar(255) NOT NULL,
    headache varchar(255) NOT NULL,
    cereal varchar(255) NOT NULL,
    entertainment varchar(255) NOT NULL,
    comic varchar(255) NOT NULL,
    pc varchar(255) NOT NULL,
    keyboard varchar(255) NOT NULL
);

insert into this_or_that(
                            surveyor_name, 
                            completion_date, 
                            more_time_money, 
                            headache, 
                            cereal, 
                            entertainment, 
                            comic, 
                            pc, 
                            keyboard
                        ) values (
                            'Kinza Ahmed', 
                            '02 Feb 2022', 
                            'more time because money can not buy you time',
                            'tylenol',
                            'honey bunches of oats',
                            'both',
                            'marvel',
                            'laptop',
                            'mechanical keyboard'
                            );