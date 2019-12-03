--1.except ��ȥA��������B�������
SELECT Id FROM tblStudent                --A��
EXCEPT
SELECT StudentId FROM tblStudentCourse   --B��


--2.intersect ��ȡ�������й�ͬ�Ĳ���
SELECT Id FROM tblStudent
INTERSECT 
SELECT StudentId FROM tblStudentCourse


--3.union ���ºϲ����������������ȥ��
--  union all �ϸ��ϲ��������������ȥ��
SELECT Id FROM tblStudent
UNION 
SELECT StudentId FROM tblStudentCourse

SELECT Id FROM tblStudent
UNION ALL 
SELECT StudentId FROM tblStudentCourse


--4.FOR XML PATH('')����˷����ѯ���ַ�����ôƴ�ӵ�����
;WITH SC AS (
	SELECT tblStudent.Name AS StudentName,tblCourse.Name AS CourseName
	FROM tblStudentCourse
	LEFT JOIN tblStudent ON tblStudent.Id = tblStudentCourse.StudentId
	LEFT JOIN tblCourse ON tblCourse.Id = tblStudentCourse.CourseId
),
SS AS (
	SELECT StudentName,STUFF((SELECT ','+CourseName FROM SC WHERE SC.StudentName = CC.StudentName FOR XML PATH('')),1,1,'') AS CourseName 
	FROM SC CC
	GROUP BY StudentName
)
SELECT * FROM SS


--5.��ת��
DataTableSource         --Դ��
pivot( 
  �ۺϺ���(����)         --ת������Ҫ��ʾ��ֵ
  FOR  ����              --ָ���ĸ�Ҫת������
  IN([��],[��2]...)     --ת����Ҫ��ʾ�ļ�������
)PIVOTTable				--��ʱ����
;WITH SSSC AS (
	SELECT tblStudent.Name AS StudentName,tblCourse.Name AS CourseName,Score 
	FROM tblStudentScore
	LEFT JOIN tblStudent ON tblStudent.Id = tblStudentScore.StudentId
	LEFT JOIN tblCourse ON tblCourse.Id = tblStudentScore.CourseId
)

--����һ��
SELECT * FROM SSSC
PIVOT(
	SUM(Score) FOR CourseName IN(java,javascript,php,mysql,mssql)
)B

--��������
/*
SELECT  StudentName,MAX(CASE WHEN CourseName='java' THEN Score ELSE 0 END ) AS java,
					MAX(CASE WHEN CourseName='javascript' THEN Score ELSE 0 END ) AS javascript,
					MAX(CASE WHEN CourseName='php' THEN Score ELSE 0 END ) AS php,
					MAX(CASE WHEN CourseName='mysql' THEN Score ELSE 0 END ) AS mysql,
					MAX(CASE WHEN CourseName='mssql' THEN Score ELSE 0 END ) AS mssql,
					SUM(Score) AS SumScore,
					AVG(Score) AS AvgScore
FROM SSSC
GROUP BY StudentName
*/

--6.��ת��
DataTableSource				--Դ��
unpivot( 
  ��ֵ����					--����ֵ������
  FOR ת��������				--��ת����֮�������
  IN([��],[��2]...)			--ת����Ҫ��ʾ�ļ�������
)UNPIVOTTable				--��ʱ����

;WITH SSSC AS (
	SELECT tblStudent.Name AS StudentName,tblCourse.Name AS CourseName,Score 
	FROM tblStudentScore
	LEFT JOIN tblStudent ON tblStudent.Id = tblStudentScore.StudentId
	LEFT JOIN tblCourse ON tblCourse.Id = tblStudentScore.CourseId
),
S AS(
	SELECT * FROM SSSC
	PIVOT(
		SUM(Score) FOR CourseName IN(java,javascript,php,mysql,mssql)
	)B
)
SELECT * FROM S
UNPIVOT(
	Score FOR CourseName IN(java,javascript,php,mysql,mssql)
)B
