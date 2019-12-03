DECLARE @num int
SET @num = 123
DECLARE @str varchar(10)
SET @str= 'hang'
SELECT @str + CAST(@num AS varchar(5))

DECLARE @str1 varchar(10)
SET @str1 = '2018-10-20'
SELECT CONVERT(date,@str1,23)

DECLARE @str3 varbinary
SET @str3 = 0x001
SELECT @str3