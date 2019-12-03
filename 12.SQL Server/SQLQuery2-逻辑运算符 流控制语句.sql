--LIKE的用法
SELECT Name FROM tblStudent WHERE Name LIKE '%王%'
SELECT Name FROM tblStudent WHERE Name LIKE '王_'
SELECT Name FROM tblStudent WHERE Class LIKE '___[1-4]_'

--EXISTS的用法
SELECT * FROM tblStudent
	WHERE EXISTS(SELECT * FROM tblStudentCourse WHERE tblStudent.ID = tblStudentCourse.studentId)
    
--IN的用法
SELECT * FROM tblStudent
	WHERE tblStudent.ID IN(SELECT studentId FROM tblStudentCourse)
	
SELECT tblStudentCourse.*,tblStudent.Name,tblCourse.名称 FROM tblStudentCourse
LEFT JOIN tblStudent ON tblStudent.ID = tblStudentCourse.studentId
LEFT JOIN tblCourse ON tblCourse.ID = tblStudentCourse.courseId

--查询学生表中名称以王开头且班级是计算机1班的学生信息
SELECT * FROM tblStudent WHERE Name LIKE '王%' AND Class = '计算机1班'

--查询学生表中名称以赵结尾的或班级是计算机1班的学生信息
SELECT * FROM tblStudent WHERE Name LIKE '%赵' OR Class = '计算机1班'

--查询学生表中名字中有孙的学生信息
SELECT * FROM tblStudent WHERE Name LIKE '%孙%'

--查询学生表中姓名拼音中以g-z开头的学生信息
SELECT * FROM tblStudent WHERE pingyin LIKE '[g-z|G-Z]%'

--查询学生成绩表中70-85之间的学生成绩信息
SELECT * FROM tblStudentScore WHERE 分数 BETWEEN 70 AND 85
SELECT * FROM tblStudentScore WHERE 分数 >= 70 AND 分数 <= 85

--查询学生成绩表中50-85之间的学生信息
SELECT *,tblStudentScore.分数 FROM tblStudent 
LEFT JOIN tblStudentScore ON tblStudentScore.studentId =tblStudent.ID 
	WHERE EXISTS(SELECT * FROM tblStudentScore WHERE (分数 BETWEEN 50 AND 85) AND tblStudent.ID = tblStudentScore.studentId )

--查询已选择课程的学生信息
SELECT * FROM tblStudent
	WHERE EXISTS(SELECT * FROM tblStudentCourse WHERE studentId = tblStudent.ID)
SELECT * FROM tblStudent
	WHERE ID IN(SELECT studentId FROM tblStudentCourse)

--查询未选择课程的学生信息
SELECT * FROM tblStudent 
	WHERE NOT EXISTS(SELECT * FROM tblStudentCourse WHERE tblStudent.ID = studentId)
SELECT * FROM tblStudent
	WHERE ID NOT IN(SELECT studentId FROM tblStudentCourse)
	
--查询学生的学习程度	
SELECT *,CASE WHEN 分数 < 60 THEN '不及格'
			  WHEN 分数 >= 60 AND 分数 <= 80 THEN '及格'
			  WHEN 分数 > 80 AND 分数 < 90 THEN '良好'
			  ELSE '优秀'
	     END  AS 程度
 FROM tblStudentScore
 
 
--查询学生成绩表中分数全部加10分【不能再原表中修改分数】之后，在依照6判断最后显示成绩情况
SELECT *,CASE WHEN 分数+10 < 60 THEN '不及格'
			  WHEN 分数+10 >= 60 AND 分数+10 <= 80 THEN '及格'
			  WHEN 分数+10 > 80 AND 分数+10 < 90 THEN '良好'
			  ELSE '优秀'
		 END  AS 程度
 FROM tblStudentScore

--比较两个日期，大则显示‘两日期比较我获胜’，小则显示‘两日期比较落败’
DECLARE @date1 date
SET @date1 = '2018.11.21'
DECLARE @date2 date
SET @date2 = '2018.11.20'
IF(@date1>@date2)
	BEGIN
		SELECT '两日期比较我获胜'
	END
ELSE
	BEGIN
		SELECT '两日期比较我落败'
	END