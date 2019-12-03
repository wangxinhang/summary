USE [SQL]
GO
/****** Object:  StoredProcedure [dbo].[ProEmployeeUpdateId]    Script Date: 03/26/2019 09:18:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,hang>
-- Create date: <Create Date,2019-03-23,>
-- Description:	<Description,根据人员Id修改人员信息的存储过程,>
-- =============================================
ALTER PROCEDURE [dbo].[ProEmployeeUpdateId]
	-- Add the parameters for the stored procedure here
	@Id int,
	@Name nvarchar(20),
	@PinYin varchar(120),
	@IDNumber varchar(20),
	@Position nvarchar(20),
	@Tel varchar(20),
	@Sex bit,
	@MaritalStatus bit,
	@EntryDate date,
	@EducationBackground nvarchar(20),
	@EmergencyMan nvarchar(20),
	@EmergencyTel varchar(20),
	@Memo nvarchar(20),
	@EmployeeStatus nvarchar(20),
	@DepartmentId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	DECLARE @SqlName nvarchar(500)
	DECLARE @SqlPinYin nvarchar(500)
	DECLARE @SqlIDNumber nvarchar(500)
	DECLARE @SqlPosition nvarchar(500)
	DECLARE @SqlTel nvarchar(500)
	DECLARE @SqlSex nvarchar(500)
	DECLARE @SqlMaritalStatus nvarchar(500)
	DECLARE @SqlEntryDate nvarchar(500)
	DECLARE @SqlEducationBackground nvarchar(500)
	DECLARE @SqlEmergencyMan nvarchar(500)
	DECLARE @SqlEmergencyTel nvarchar(500)
	DECLARE @SqlMemo nvarchar(500)
	DECLARE @SqlEmployeeStatus nvarchar(500)
	DECLARE @SqlDepartmentId nvarchar(500)
	DECLARE @Sql nvarchar(max)
	
	SET @SqlName = CASE WHEN ISNULL(@Name,'')='' THEN '' ELSE 'Name = '+@Name+',' END
	SET @SqlPinYin = CASE WHEN ISNULL(@PinYin,'')='' THEN '' ELSE 'PinYin = '+@PinYin+',' END
	SET @SqlIDNumber = CASE WHEN ISNULL(@IDNumber,'')='' THEN '' ELSE 'IDNumber = '+@IDNumber+',' END
	SET @SqlPosition = CASE WHEN ISNULL(@Position,'')='' THEN '' ELSE 'Position = '+@Position+',' END
	SET @SqlTel = CASE WHEN ISNULL(@Tel,'')='' THEN '' ELSE 'Tel = '+@Tel+',' END
	SET @SqlSex = CASE WHEN ISNULL(@Sex,'')='' THEN '' ELSE 'Sex = '+LTRIM(STR(@Sex))+',' END
	SET @SqlMaritalStatus = CASE WHEN ISNULL(@MaritalStatus,'')='' THEN '' ELSE 'MaritalStatus = '+LTRIM(STR(@MaritalStatus))+',' END
	SET @SqlEntryDate = CASE WHEN ISNULL(@EntryDate,'')='' THEN '' ELSE 'EntryDate = '+CAST(@EntryDate AS varchar(20))+',' END
	SET @SqlEducationBackground = CASE WHEN ISNULL(@EducationBackground,'')='' THEN '' ELSE 'EducationBackground = '+@EducationBackground+',' END
	SET @SqlEmergencyMan = CASE WHEN ISNULL(@EmergencyMan,'')='' THEN '' ELSE 'EmergencyMan = '+@EmergencyMan+',' END
	SET @SqlEmergencyTel = CASE WHEN ISNULL(@EmergencyTel,'')='' THEN '' ELSE 'EmergencyTel = '+@EmergencyTel+',' END
	SET @SqlMemo = CASE WHEN ISNULL(@Memo,'')='' THEN '' ELSE 'Memo = '+@Memo+',' END
	SET @SqlDepartmentId = CASE WHEN ISNULL(@DepartmentId,'')='' THEN '' ELSE 'DepartmentId = '+LTRIM(STR(@DepartmentId))+',' END
	
	SET @Sql = '
	UPDATE tblEmployee  SET  '+@SqlName+@SqlPinYin+@SqlIDNumber+@SqlPosition+@SqlTel+@SqlSex+@SqlMaritalStatus+@SqlEntryDate+@SqlEducationBackground+@SqlEmergencyMan+@SqlEmergencyTel+@SqlMemo+@SqlDepartmentId+'
					          DataStatusId = 1
					    WHERE  Id = '+LTRIM(STR(@Id))
	EXEC(@Sql)
	print(@Sql)
END
