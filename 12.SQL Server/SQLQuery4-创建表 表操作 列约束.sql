--������
create table ����(
   ����1  �������� null| not null identity(1,1) primary key ,
   ����2  �������� null| not null 
   .....
)
create table tblDepartment(
	ID int not null identity(1,1) primary key,
	Name nvarchar(50) not null ,
	Tel varchar(15) not null
)



--�޸ı�
--1.������
alter table ���� add ���� ���������� null
--2.ɾ����
alter table ���� drop column ����
--3.�޸�����������
alter table ���� alter column ���� ����������
--4.�޸�����
exec sp_rename '����.ԭ����',������,'column'
--5.�޸ı���
exec sp_rename 'ԭ����',�±���
--6.ɾ����
drop table ����



--�е�Լ��

--1.����Լ��
--���ã�Ψһ��ʶÿ�����ݣ�����Ϊ�գ������ظ�
alter table ���� add constraint PK_���� primary key (����)

--2.���Լ��
--���ã�����һ�ű�����Ϊ������Ϊ���������ϵ���ڱ����г䵱���
alter table ���� add constraint FK_���� foreign key (����) references ��һ�ű��� (����������)

--3.uniqueԼ��
--���ã���֤ĳ�����ݲ��ظ�
alter table ���� add constraint UN_���� unique (����)

--4.checkԼ��
--���ã���֤ĳ��������һ���ķ�Χ
alter table ���� add constraint CK_���� check (�������ʽ)
alter table tblEmployee add constraint CK_PinYin check (PinYin like '[a-h|A-H]%')

--5.defaultԼ��
--���ã�������ò�����nullֵ������Ҫ����������Ĭ��ֵ��Ĭ��ֵ�������͸��е��������ͱ���һ�£�
alter table ���� add constraint DF_���� default (Ĭ��ֵ) for ����
alter table tblDepartment add constraint DF_Tel default ('') for Tel

  

--ɾ��Լ��
alter table ���� drop constraint Լ����