--LIKE���÷�
SELECT Name FROM tblStudent WHERE Name LIKE '%��%'
SELECT Name FROM tblStudent WHERE Name LIKE '��_'
SELECT Name FROM tblStudent WHERE Class LIKE '___[1-4]_'

--EXISTS���÷�
SELECT * FROM tblStudent
	WHERE EXISTS(SELECT * FROM tblStudentCourse WHERE tblStudent.ID = tblStudentCourse.studentId)
    
--IN���÷�
SELECT * FROM tblStudent
	WHERE tblStudent.ID IN(SELECT studentId FROM tblStudentCourse)
	
SELECT tblStudentCourse.*,tblStudent.Name,tblCourse.���� FROM tblStudentCourse
LEFT JOIN tblStudent ON tblStudent.ID = tblStudentCourse.studentId
LEFT JOIN tblCourse ON tblCourse.ID = tblStudentCourse.courseId

--��ѯѧ����������������ͷ�Ұ༶�Ǽ����1���ѧ����Ϣ
SELECT * FROM tblStudent WHERE Name LIKE '��%' AND Class = '�����1��'

--��ѯѧ�������������Խ�β�Ļ�༶�Ǽ����1���ѧ����Ϣ
SELECT * FROM tblStudent WHERE Name LIKE '%��' OR Class = '�����1��'

--��ѯѧ�����������������ѧ����Ϣ
SELECT * FROM tblStudent WHERE Name LIKE '%��%'

--��ѯѧ����������ƴ������g-z��ͷ��ѧ����Ϣ
SELECT * FROM tblStudent WHERE pingyin LIKE '[g-z|G-Z]%'

--��ѯѧ���ɼ�����70-85֮���ѧ���ɼ���Ϣ
SELECT * FROM tblStudentScore WHERE ���� BETWEEN 70 AND 85
SELECT * FROM tblStudentScore WHERE ���� >= 70 AND ���� <= 85

--��ѯѧ���ɼ�����50-85֮���ѧ����Ϣ
SELECT *,tblStudentScore.���� FROM tblStudent 
LEFT JOIN tblStudentScore ON tblStudentScore.studentId =tblStudent.ID 
	WHERE EXISTS(SELECT * FROM tblStudentScore WHERE (���� BETWEEN 50 AND 85) AND tblStudent.ID = tblStudentScore.studentId )

--��ѯ��ѡ��γ̵�ѧ����Ϣ
SELECT * FROM tblStudent
	WHERE EXISTS(SELECT * FROM tblStudentCourse WHERE studentId = tblStudent.ID)
SELECT * FROM tblStudent
	WHERE ID IN(SELECT studentId FROM tblStudentCourse)

--��ѯδѡ��γ̵�ѧ����Ϣ
SELECT * FROM tblStudent 
	WHERE NOT EXISTS(SELECT * FROM tblStudentCourse WHERE tblStudent.ID = studentId)
SELECT * FROM tblStudent
	WHERE ID NOT IN(SELECT studentId FROM tblStudentCourse)
	
--��ѯѧ����ѧϰ�̶�	
SELECT *,CASE WHEN ���� < 60 THEN '������'
			  WHEN ���� >= 60 AND ���� <= 80 THEN '����'
			  WHEN ���� > 80 AND ���� < 90 THEN '����'
			  ELSE '����'
	     END  AS �̶�
 FROM tblStudentScore
 
 
--��ѯѧ���ɼ����з���ȫ����10�֡�������ԭ�����޸ķ�����֮��������6�ж������ʾ�ɼ����
SELECT *,CASE WHEN ����+10 < 60 THEN '������'
			  WHEN ����+10 >= 60 AND ����+10 <= 80 THEN '����'
			  WHEN ����+10 > 80 AND ����+10 < 90 THEN '����'
			  ELSE '����'
		 END  AS �̶�
 FROM tblStudentScore

--�Ƚ��������ڣ�������ʾ�������ڱȽ��һ�ʤ����С����ʾ�������ڱȽ���ܡ�
DECLARE @date1 date
SET @date1 = '2018.11.21'
DECLARE @date2 date
SET @date2 = '2018.11.20'
IF(@date1>@date2)
	BEGIN
		SELECT '�����ڱȽ��һ�ʤ'
	END
ELSE
	BEGIN
		SELECT '�����ڱȽ������'
	END