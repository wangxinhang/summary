USE [SBJYJC]
GO

/****** Object:  StoredProcedure [dbo].[proContractDepartmentGetList]    Script Date: 05/11/2019 10:27:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





-- =============================================
-- Author:		xutrui
-- Create date: 20151023
-- Description:	获取用户权限范围内的部门列表
-- =============================================
CREATE PROCEDURE [dbo].[proContractDepartmentGetList]
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;	
	
	
	DECLARE @SqlRecordSet nvarchar(max)
	--SqlTelecomOperatorID查询条件语句--	
    -- Insert statements for procedure here
	SET @SqlRecordSet='
	 
		SELECT ID,Name,ParentID
		FROM tblContractDepartment 
		WHERE DataStatusID=1
		
		'
		--执行最终的查询语句	
	EXEC (@SqlRecordSet)	
	print(@SqlRecordSet)	
		
END





GO

