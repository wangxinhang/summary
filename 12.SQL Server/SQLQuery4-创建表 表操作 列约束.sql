--创建表
create table 表名(
   列名1  数据类型 null| not null identity(1,1) primary key ,
   列名2  数据类型 null| not null 
   .....
)
create table tblDepartment(
	ID int not null identity(1,1) primary key,
	Name nvarchar(50) not null ,
	Tel varchar(15) not null
)



--修改表
--1.新增列
alter table 表名 add 列名 列数据类型 null
--2.删除列
alter table 表名 drop column 列名
--3.修改列数据类型
alter table 表名 alter column 列名 列数据类型
--4.修改列名
exec sp_rename '表名.原列名',新列名,'column'
--5.修改表名
exec sp_rename '原表名',新表名
--6.删除表
drop table 表名



--列的约束

--1.主键约束
--作用：唯一标识每列数据，不能为空，不能重复
alter table 表名 add constraint PK_列名 primary key (列名)

--2.外键约束
--作用：再另一张表里作为主键，为了两表的联系，在本表中充当外键
alter table 表名 add constraint FK_列名 foreign key (列名) references 另一张表名 (主键所在列)

--3.unique约束
--作用：保证某列数据不重复
alter table 表名 add constraint UN_列名 unique (列名)

--4.check约束
--作用：保证某列数据在一定的范围
alter table 表名 add constraint CK_列名 check (条件表达式)
alter table tblEmployee add constraint CK_PinYin check (PinYin like '[a-h|A-H]%')

--5.default约束
--作用：由于最好不设置null值，所以要给数据设置默认值（默认值数据类型跟列的数据类型保持一致）
alter table 表名 add constraint DF_列名 default (默认值) for 列名
alter table tblDepartment add constraint DF_Tel default ('') for Tel

  

--删除约束
alter table 表名 drop constraint 约束名