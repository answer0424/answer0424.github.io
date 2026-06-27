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

---

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

---

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

---

1. avg sub_Code

2. 매출액 > 1000 소속도시 3

3. SELECT 과목이름, MIN(점수) AS 최소점수, MAX(점수) AS 최대점수 FROM 성적 GROUP BY 과목이름 HAVING AVG(점수) >= 90;

4. SELECT 학생정보.이름, 학생정보.전공, 신청정보.신청과목 FROM 학생정보, 신청정보 WHERE 학생정보.학번 = 신청정보.학번 GROUP BY 전공, 신청과목 HAVING 전공 = '컴퓨터공학' AND 신청과목 = 'Java';

5. 1

6. HAVING

7. 장학내역 장학금 NUM

8. 학과 장학내역 SUM(장학금)