--1.�ۺϺ���
--��ÿ��ѧ�����ܷ�
SELECT studentId,SUM(����) AS totalScore FROM tblStudentScore GROUP BY studentId
--��ÿ��ѧ����ƽ����
SELECT studentId,AVG(����) AS average FROM tblStudentScore GROUP BY studentId
--��ÿ��ѧ���Ŀγ���
SELECT studentId,COUNT(courseId) AS total FROM tblStudentScore GROUP BY studentId 
--��ÿ��ѧ������߷��Լ���ͷ�
SELECT studentId,MAX(����) AS maxScore,MIN(����) AS minScore FROM tblStudentScore GROUP BY studentId 


--2.��ѧ����
SELECT ABS(-1.1)
SELECT CEILING(1.1)
SELECT FLOOR(1.1)
SELECT ROUND(1.11,1)
SELECT RAND()

--3.���ں���
SELECT DATEADD(YY,1,'2018.12.26')
SELECT DATEDIFF(YY,'2018.07.11','2019.07.11')
SELECT DATENAME(YY,'2018.12.26')
SELECT DATEPART(YY,'2018.12.26')
SELECT YEAR(GETDATE())
SELECT MONTH(GETDATE())
SELECT DAY(GETDATE())

--4.�ַ�������
--�淶�ַ�������
SELECT RTRIM(LTRIM('  LALALA   '))
SELECT 'LALALA' + SPACE(3) + 'AFAFAF'
SELECT LOWER('DFFFDF')
SELECT UPPER('sssss')
--�����ַ�������
SELECT CHARINDEX('a','sdaf')
SELECT PATINDEX('%a%','sdaf')
--��ȡ�ַ�������
SELECT LEFT('ASDF',3)
SELECT RIGHT('ASDF',3)
SELECT SUBSTRING('ASDF',2,2)
--�滻�ַ�������
SELECT REPLACE('ASDFSD','SD','11')
SELECT REPLACE('ASDFSD','SD','')
SELECT STUFF('ASDFSD',1,0,'12')   --���һ��������ɾ���ַ���
SELECT STUFF('ASDFSD',1,2,'12')
--��ֵת�ַ�������
SELECT STR(123)
SELECT STR(123.123,7,3)


--5.��ҳ����:��ÿ�����ݼ�һ�����
--row_rumber() over( order by �����ֶ� ����ʽ)
SELECT ROW_NUMBER() OVER( order by ID asc) as rowNumber,* FROM tblStudent
					