--增
--1.插入单行或多行数据
insert into 表名(column1,column2,column3...)
			values(value1,value2,value3)
insert into tblDepartment(Name,Tel)
			values('wang',1321342534534),
			      ('hang',3422112223332)			      
--2.将查询表中的数据插入到目标表中
insert into 目标表(column1,column2,column3...)
			select column1,column2,column3 from 查询表	where 条件
insert into tblDepartment(Name,Tel)
			select Name,Tel from tblEmployee where ID = 3    
--3.查询数据，新建表，并将查询表中的数据插入到新建表中			
select column1,column2... into 新表名 from 查询表 where 条件
select ID,Name,Tel into tblDepartmentNew from tblDepartment where Name = 'hang'
		

		
--删
--1.删除数据
delete 表名 where 条件
delete tblDepartment where ID <= 5
--2.清空表里的数据
delete 表名            (该方法只负责清除数据)
delete tblDepartment
truncate table 表名    (该方法不但清除数据,而且还清除标识列)
truncate table tblDepartment
drop table 表名      (该方法是将表整个清除了)
drop table tblDepartmentNew




--改
--1.更改数据
update 表名 set 列名=value where 条件
update tblDepartment set age=20 where Name = 'wang'
update tblDepartment set age+=10 where Name = 'wang'
--2.通过查询其他表中的数据更新到目标表中
update 目标表 set 目标表.列名 = (select 列名 from 查询表 where 查询表筛选条件) where 目标表筛选条件
update tblDepartment set tblDepartment.Tel = (select Tel from tblEmployee where Name = 'xin') where Name = 'hang'




--查
--1.一般查询
select  * | 列名 | top number或(number percent) 列名 | distinct 列名...| isnull(列名,赋值)  from 表名 where 条件
select top 2 * from tblDepartment order by age       --order by 按指定列排序  desc倒序（默认esc正序）
select top 50 percent * from tblDepartment where age<=30 order by ID desc
select distinct Name,age from tblDepartment          --distinct 去重（去除指定列相同的数据）
select * from tblDepartment where age is null	     --is null 筛选数据为空的指定列
select * from tblDepartment where age is not null    --is not null 筛选数据不为空的指定列
select isnull(age,100) as ageNew from tblDepartment	 --isnull 指定列是否有空值，如果有给其赋值
--2.分组查询
select 分组列名,聚合函数 from 表名 where 条件 
						group by 分组列名 having 二次筛选条件(可不写) order by 指定列名
select adress,AVG(age) as AVGage from tblDepartment where age is not null
						group by adress having  AVG(age)<=30 order by AVGage
--3.多表查询

 --3.1 左连接，数据显示时以左表为主，右表配合左表链接数据
select * from 表名 where 条件
left join 表名 on 链接条件					  
select E.*,D.* from tblEmployee as E
left join tblDepartment as D on E.DepartmentId = D.ID
select E.*,D.* from tblDepartment as D
left join tblEmployee as E on E.DepartmentId = D.ID

--3.2 inner join 连接，数据显示两表的交集
select * from 表名 where 条件
inner join 表名 on 链接条件
select E.*,D.* from tblEmployee as E
inner join tblDepartment as D on E.DepartmentId = D.ID

--3.3 full join 连接，数据显示两表的并集
select * from 表名 where 条件
full join 表名 on 链接条件
select E.*,D.* from tblEmployee as E
full join tblDepartment as D on E.DepartmentId = D.ID

--3.4 cross join 连接，将二表中的数据链接给一表中的每一条数据
select * from 表名 where 条件
cross join 表名 on 链接条件
select E.*,D.* from tblEmployee as E
cross join tblDepartment as D 




--CTE(Common Table Expression) 公用表表达式: 一个临时的结果集
;with A as (
	select isnull(age,100) as ageNew from tblDepartment
)
select * from A


			      select * from tblDepartment
			      select * from tblEmployee