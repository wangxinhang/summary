--1.聚合函数
--求每个学生的总分
SELECT studentId,SUM(分数) AS totalScore FROM tblStudentScore GROUP BY studentId
--求每个学生的平均分
SELECT studentId,AVG(分数) AS average FROM tblStudentScore GROUP BY studentId
--求每个学生的课程数
SELECT studentId,COUNT(courseId) AS total FROM tblStudentScore GROUP BY studentId 
--求每个学生的最高分以及最低分
SELECT studentId,MAX(分数) AS maxScore,MIN(分数) AS minScore FROM tblStudentScore GROUP BY studentId 


--2.数学函数
SELECT ABS(-1.1)
SELECT CEILING(1.1)
SELECT FLOOR(1.1)
SELECT ROUND(1.11,1)
SELECT RAND()

--3.日期函数
SELECT DATEADD(YY,1,'2018.12.26')
SELECT DATEDIFF(YY,'2018.07.11','2019.07.11')
SELECT DATENAME(YY,'2018.12.26')
SELECT DATEPART(YY,'2018.12.26')
SELECT YEAR(GETDATE())
SELECT MONTH(GETDATE())
SELECT DAY(GETDATE())

--4.字符串函数
--规范字符串函数
SELECT RTRIM(LTRIM('  LALALA   '))
SELECT 'LALALA' + SPACE(3) + 'AFAFAF'
SELECT LOWER('DFFFDF')
SELECT UPPER('sssss')
--查找字符串函数
SELECT CHARINDEX('a','sdaf')
SELECT PATINDEX('%a%','sdaf')
--截取字符串函数
SELECT LEFT('ASDF',3)
SELECT RIGHT('ASDF',3)
SELECT SUBSTRING('ASDF',2,2)
--替换字符串函数
SELECT REPLACE('ASDFSD','SD','11')
SELECT REPLACE('ASDFSD','SD','')
SELECT STUFF('ASDFSD',1,0,'12')   --而且还可以添加删除字符串
SELECT STUFF('ASDFSD',1,2,'12')
--数值转字符串函数
SELECT STR(123)
SELECT STR(123.123,7,3)


--5.分页函数:给每条数据加一个序号
--row_rumber() over( order by 排序字段 排序方式)
SELECT ROW_NUMBER() OVER( order by ID asc) as rowNumber,* FROM tblStudent
					