--1.except 除去A表中属于B表的内容
SELECT Id FROM tblStudent                --A表
EXCEPT
SELECT StudentId FROM tblStudentCourse   --B表


--2.intersect 获取两个集中共同的部分
SELECT Id FROM tblStudent
INTERSECT 
SELECT StudentId FROM tblStudentCourse


--3.union 上下合并两个结果集，并且去重
--  union all 上个合并连个结果集，不去重
SELECT Id FROM tblStudent
UNION 
SELECT StudentId FROM tblStudentCourse

SELECT Id FROM tblStudent
UNION ALL 
SELECT StudentId FROM tblStudentCourse


--4.FOR XML PATH('')解决了分组查询后字符串怎么拼接的问题
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


--5.行转列
DataTableSource         --源表
pivot( 
  聚合函数(列名)         --转换后列要显示的值
  FOR  列名              --指定哪个要转换成列
  IN([列],[列2]...)     --转换后要显示的几个列名
)PIVOTTable				--临时表名
;WITH SSSC AS (
	SELECT tblStudent.Name AS StudentName,tblCourse.Name AS CourseName,Score 
	FROM tblStudentScore
	LEFT JOIN tblStudent ON tblStudent.Id = tblStudentScore.StudentId
	LEFT JOIN tblCourse ON tblCourse.Id = tblStudentScore.CourseId
)

--方法一：
SELECT * FROM SSSC
PIVOT(
	SUM(Score) FOR CourseName IN(java,javascript,php,mysql,mssql)
)B

--方法二：
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

--6.列转行
DataTableSource				--源表
unpivot( 
  新值列名					--新列值的列名
  FOR 转化后列名				--列转化行之后的列名
  IN([列],[列2]...)			--转换后要显示的几个列名
)UNPIVOTTable				--临时表名

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
