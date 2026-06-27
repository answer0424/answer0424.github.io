create table partient
    (id char(5) primary key,
        name char(10),
        sex char(1),
        phone char(20),
        constraint sex_ch check (sex='f' or sex='m'),
        constraint id_fk foreign key(id) references doctor(doc_id));


create table instructor
    (id char(5)
        name char(15) not null,
        dept char(15),
        parmary key(id),
        foreign key(dept) references department(dept)
            on delete set null
            on update cascade
);

create view CC(ccid, ccname, instname) as
    select course.id, course.name, instructor.name
    from course, instructor
    where course.instructor = instructor.id;

update salaries
set salary = 2500
where emp_num = 2073;

into values set

delete
from 학생
where 이름 = 'Scott';

set where

update set

alter create drop 
select delete insert update
grant revoek

11 17

200 3 1

select * from Product where price is null order by name asc;

and asc not

이% desc

학과코드, 학과, 교수명, 학생수 학생수 <= 30

SELECT DISTINT 과목 FROM 학생 WHERE 학년 >= 3

and distinct in

SELECT ID, NAME FROM CUSTOMER;
SELECT DISTINCT GRADE FROM CUSTOMER;
SELECT NAME FROM CUSTOMER WHERE AGE IS NULL;
SELECT NAME FROM CUSTOMER WHERE AGE IS NOT NULL;

AND BETWEEN