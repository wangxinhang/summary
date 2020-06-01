USE [SBJYJC]
GO

/****** Object:  StoredProcedure [dbo].[proContractSubtotalGetList]    Script Date: 05/11/2019 10:27:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO






-- =============================================
-- Author:		xurui	
-- Create date: 20161206
-- Description:	合同分类统计
-- =============================================
CREATE PROCEDURE [dbo].[proContractSubtotalGetList]
	-- Add the parameters for the stored procedure here	
		--分页及排序参数--
		@DepartmentID int=0,
	@IsRecordSet int=1,								--1：返回查询结果集；2:返回汇总数据；默认：1
	@IsPaged bit=0,									--0:返回不分页结果，1：返回分页显示数据；默认：1
	@PageNumber int=1,								--页数,默认：1
	@PageSize int=10,								--每页记录数，默认：10
	@OrderFieldName varchar(100)=NULL,				--排序字段,默认：null
	@OrderType varchar(10)=null  					--ASC:升序，DESC：降序；默认：null
	       
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	DECLARE @SqlDepartmentID nvarchar(500)		
	DECLARE @SqlParentDepartmentID nvarchar(500)	
	DECLARE @SqlGrandDepartmentID nvarchar(500)	
	DECLARE @SqlCondition_Contract nvarchar(max)
	DECLARE @SqlWhere_Contract nvarchar(max)
	DECLARE @DepartmentIDTable table(DepartmentID int,Department nvarchar(50))
	DECLARE @SqlPermissionDepartment nvarchar(1000)
	DECLARE @Sql nvarchar(max)
	DECLARE @SqlRecordSetA nvarchar(max)
	DECLARE @SqlDepartmentFliter nvarchar(max)	
	
	--分页相关--
	
	--SqlDepartmentID查询条件语句--
	BEGIN
		SET @SqlDepartmentID=CASE WHEN ISNULL(@DepartmentID,0)=0 THEN '' ELSE ' WHERE DepartmentID='+STR(@DepartmentID) END
		
		SET @SqlParentDepartmentID=CASE WHEN ISNULL(@DepartmentID,0)=0 THEN '' ELSE ' WHERE ParentDepartmentID='+STR(@DepartmentID) END 
		
		SET @SqlGrandDepartmentID=CASE WHEN ISNULL(@DepartmentID,0)=0 THEN '' ELSE ' WHERE GrandDepartmentID='+STR(@DepartmentID) END 
	END
	BEGIN
		DECLARE @SqlRecordCount nvarchar(500)
		DECLARE @SqlRecordSum nvarchar(500)
		DECLARE @SqlRecordSet nvarchar(max)
		DECLARE @SqlUnPaged nvarchar(max)
		DECLARE @SqlPaged nvarchar(max)
	END
	
	--排序相关
	BEGIN
		DECLARE @SqlOrder nvarchar(500)
		DECLARE @SqlOrderType nvarchar(500)    
	END	
	
	declare @begin_date datetime
	declare @end_date datetime
	select @begin_date = getdate()		
	

	--===================查询语句==================--	
	--合同	
	SET @SqlRecordSet='
		WITH TU AS 
		(
			SELECT ID,Name,Amount,ReturnDate AS Date,DepartmentID,EntrustingUnitID FROM tblContract 
			WHERE DataStatusID=1 AND ContactStatusID=6  AND Year(ReturnDate)=2018
		),
		TPD AS
		(
			SELECT TU.*,ParentDepartmentID=CASE WHEN D.ParentID IN (SELECT ID FROM tblContractDepartment WHERE DataStatusID=1 AND ParentID=1) THEN TU.DepartmentID 
										        WHEN D.ParentID=1 THEN TU.DepartmentID ELSE D.ParentID END
			FROM TU LEFT JOIN tblContractDepartment AS D ON D.ID=TU.DepartmentID 
		),
		TGD AS
		(
			SELECT TPD.*,GrandDepartmentID=CASE PD.ParentID WHEN 1 THEN TPD.ParentDepartmentID ELSE PD.ParentID END
			FROM TPD LEFT JOIN tblContractDepartment AS PD ON PD.ID=TPD.ParentDepartmentID 
		),
		'
		--部门筛选
		SET @SqlDepartmentFliter=CASE WHEN ISNULL(@DepartmentID,0)=0 THEN '		
			TUF AS(SELECT TGD.* FROM TGD),' 
			ELSE '
			CJDF AS
			(
				SELECT * FROM TGD '+@SqlDepartmentID+'
				UNION 
				SELECT * FROM TGD '+@SqlParentDepartmentID+'
				UNION 
				SELECT * FROM TGD '+@SqlGrandDepartmentID+'
			),
			TUF AS(SELECT CJDF.* FROM CJDF ),' END	
			
		SET @SqlRecordSetA='TUFF AS
		(
			SELECT TUF.ID,TUF.Name,TUF.Amount,TUF.Date,TUF.DepartmentID,TUF.ParentDepartmentID,TUF.GrandDepartmentID,
				   D.Name AS Department,D2.Name AS ParentDepartment,D3.Name AS GrandDepartment,
				   Month(Date) AS Month,Year(Date) AS Year
			FROM TUF 
			LEFT JOIN tblContractDepartment AS D ON TUF.DepartmentID=D.ID
			LEFT JOIN tblContractDepartment AS D2 ON TUF.ParentDepartmentID=D2.ID
			LEFT JOIN tblContractDepartment AS D3 ON TUF.GrandDepartmentID=D3.ID
			
		),	
		TSFX AS(SELECT TUFF.*,QuarterID=CASE WHEN Month<4 THEN 1 WHEN Month<7 THEN 2 WHEN Month<10 THEN 3 ELSE 4 END FROM TUFF),
		TSF AS(SELECT TSFX.*,Quarter=CASE WHEN QuarterID=1 THEN ''1季度'' WHEN QuarterID=2 THEN ''2季度'' 
		                    WHEN QuarterID=3 THEN ''3季度'' ELSE ''4季度'' END FROM TSFX
		       )'		   	
	
	--不分页查询语句--
	SET @SqlUnPaged='SELECT * FROM TSF '
	SET @Sql=@SqlRecordSet+@SqlDepartmentFliter+@SqlRecordSetA+@SqlUnPaged
		 
	--执行最终的查询语句	
	EXEC (@Sql)	
	print(@Sql)	
	
	select @end_date = getdate()
	select datediff(ms,@begin_date,@end_date) as '毫秒'
END







GO

