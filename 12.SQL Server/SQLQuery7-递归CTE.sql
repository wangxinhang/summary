--简单的递归CTE的用法
;WITH D AS ( 
	SELECT * FROM tblDepartment  WHERE ID = 3					  --基础语句，告诉程序何时开始递归
	UNION ALL
	SELECT T.* FROM tblDepartment AS T,D WHERE T.ParentID = D.Id  --递归语句，确定递归的条件
)
SELECT * FROM D
