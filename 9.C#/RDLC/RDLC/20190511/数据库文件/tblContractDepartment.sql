USE [SBJYJC]
GO

/****** Object:  Table [dbo].[tblContractDepartment]    Script Date: 05/11/2019 10:27:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[tblContractDepartment](
	[ID] [int] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[ParentID] [int] NOT NULL,
	[DepartmentTypeID] [int] NULL,
	[AdministrativeDivisionID] [varchar](6) NULL,
	[DataStatusID] [int] NULL,
	[Memo] [nvarchar](max) NULL,
	[CreatorID] [int] NULL,
	[DateCreated] [datetime] NULL,
	[ModifierID] [int] NULL,
	[DateModified] [datetime] NULL,
 CONSTRAINT [PK__tblContractDepartment__3214EC272F650636] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[tblContractDepartment] ADD  CONSTRAINT [DF_tblContractDepartment_DataStatusID]  DEFAULT ((1)) FOR [DataStatusID]
GO

ALTER TABLE [dbo].[tblContractDepartment] ADD  CONSTRAINT [DF_tblContractDepartment_DateCreated]  DEFAULT (getdate()) FOR [DateCreated]
GO

