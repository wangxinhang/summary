--��
--1.���뵥�л��������
insert into ����(column1,column2,column3...)
			values(value1,value2,value3)
insert into tblDepartment(Name,Tel)
			values('wang',1321342534534),
			      ('hang',3422112223332)			      
--2.����ѯ���е����ݲ��뵽Ŀ�����
insert into Ŀ���(column1,column2,column3...)
			select column1,column2,column3 from ��ѯ��	where ����
insert into tblDepartment(Name,Tel)
			select Name,Tel from tblEmployee where ID = 3    
--3.��ѯ���ݣ��½���������ѯ���е����ݲ��뵽�½�����			
select column1,column2... into �±��� from ��ѯ�� where ����
select ID,Name,Tel into tblDepartmentNew from tblDepartment where Name = 'hang'
		

		
--ɾ
--1.ɾ������
delete ���� where ����
delete tblDepartment where ID <= 5
--2.��ձ��������
delete ����            (�÷���ֻ�����������)
delete tblDepartment
truncate table ����    (�÷��������������,���һ������ʶ��)
truncate table tblDepartment
drop table ����      (�÷����ǽ������������)
drop table tblDepartmentNew




--��
--1.��������
update ���� set ����=value where ����
update tblDepartment set age=20 where Name = 'wang'
update tblDepartment set age+=10 where Name = 'wang'
--2.ͨ����ѯ�������е����ݸ��µ�Ŀ�����
update Ŀ��� set Ŀ���.���� = (select ���� from ��ѯ�� where ��ѯ��ɸѡ����) where Ŀ���ɸѡ����
update tblDepartment set tblDepartment.Tel = (select Tel from tblEmployee where Name = 'xin') where Name = 'hang'




--��
--1.һ���ѯ
select  * | ���� | top number��(number percent) ���� | distinct ����...| isnull(����,��ֵ)  from ���� where ����
select top 2 * from tblDepartment order by age       --order by ��ָ��������  desc����Ĭ��esc����
select top 50 percent * from tblDepartment where age<=30 order by ID desc
select distinct Name,age from tblDepartment          --distinct ȥ�أ�ȥ��ָ������ͬ�����ݣ�
select * from tblDepartment where age is null	     --is null ɸѡ����Ϊ�յ�ָ����
select * from tblDepartment where age is not null    --is not null ɸѡ���ݲ�Ϊ�յ�ָ����
select isnull(age,100) as ageNew from tblDepartment	 --isnull ָ�����Ƿ��п�ֵ������и��丳ֵ
--2.�����ѯ
select ��������,�ۺϺ��� from ���� where ���� 
						group by �������� having ����ɸѡ����(�ɲ�д) order by ָ������
select adress,AVG(age) as AVGage from tblDepartment where age is not null
						group by adress having  AVG(age)<=30 order by AVGage
--3.����ѯ

 --3.1 �����ӣ�������ʾʱ�����Ϊ�����ұ���������������
select * from ���� where ����
left join ���� on ��������					  
select E.*,D.* from tblEmployee as E
left join tblDepartment as D on E.DepartmentId = D.ID
select E.*,D.* from tblDepartment as D
left join tblEmployee as E on E.DepartmentId = D.ID

--3.2 inner join ���ӣ�������ʾ����Ľ���
select * from ���� where ����
inner join ���� on ��������
select E.*,D.* from tblEmployee as E
inner join tblDepartment as D on E.DepartmentId = D.ID

--3.3 full join ���ӣ�������ʾ����Ĳ���
select * from ���� where ����
full join ���� on ��������
select E.*,D.* from tblEmployee as E
full join tblDepartment as D on E.DepartmentId = D.ID

--3.4 cross join ���ӣ��������е��������Ӹ�һ���е�ÿһ������
select * from ���� where ����
cross join ���� on ��������
select E.*,D.* from tblEmployee as E
cross join tblDepartment as D 




--CTE(Common Table Expression) ���ñ���ʽ: һ����ʱ�Ľ����
;with A as (
	select isnull(age,100) as ageNew from tblDepartment
)
select * from A


			      select * from tblDepartment
			      select * from tblEmployee