--�򵥵ĵݹ�CTE���÷�
;WITH D AS ( 
	SELECT * FROM tblDepartment  WHERE ID = 3					  --������䣬���߳����ʱ��ʼ�ݹ�
	UNION ALL
	SELECT T.* FROM tblDepartment AS T,D WHERE T.ParentID = D.Id  --�ݹ���䣬ȷ���ݹ������
)
SELECT * FROM D
