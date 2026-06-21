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

