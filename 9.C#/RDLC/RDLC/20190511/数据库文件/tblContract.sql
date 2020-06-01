USE [SBJYJC]
GO

/****** Object:  Table [dbo].[tblContract]    Script Date: 05/11/2019 10:26:58 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[tblContract](
	[ID] [varchar](30) NOT NULL,
	[Name] [nvarchar](300) NOT NULL,
	[Amount] [decimal](11, 6) NULL,
	[ReturnDate] [date] NULL,
	[EmployeeID] [int] NULL,
	[DepartmentID] [int] NULL,
	[SpecialtyID] [int] NULL,
	[ContactTypeID] [int] NULL,
	[ContactStatusID] [int] NULL,
	[EntrustingUnitID] [int] NULL,
	[PartyASignDate] [date] NULL,
	[PartyBSignDate] [date] NULL,
	[PartyAContractNumber] [varchar](30) NULL,
	[InvestmentAmount] [decimal](12, 6) NULL,
	[IsTax] [bit] NULL,
	[DifficultyID] [int] NULL,
	[ContractReturnFlagID] [int] NULL,
	[ContractNatureID] [int] NULL,
	[DataStatusId] [int] NULL,
	[Memo] [nvarchar](max) NULL,
	[CreatorID] [int] NULL,
	[DateCreated] [datetime] NULL,
	[ModifierID] [int] NULL,
	[DateModified] [datetime] NULL,
 CONSTRAINT [PK_tblContract] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[tblContract] ADD  CONSTRAINT [DF_tblContract_Amount]  DEFAULT ((0)) FOR [Amount]
GO

ALTER TABLE [dbo].[tblContract] ADD  CONSTRAINT [DF_tblContract_ReturnDate]  DEFAULT ('1900-01-01') FOR [ReturnDate]
GO

ALTER TABLE [dbo].[tblContract] ADD  CONSTRAINT [DF_tblContract_EmployeeID]  DEFAULT ((0)) FOR [EmployeeID]
GO

ALTER TABLE [dbo].[tblContract] ADD  CONSTRAINT [DF_tblContract_DepartmentID]  DEFAULT ((0)) FOR [DepartmentID]
GO

ALTER TABLE [dbo].[tblContract] ADD  CONSTRAINT [DF_tblContract_SpecialtyID]  DEFAULT ((0)) FOR [SpecialtyID]
GO

ALTER TABLE [dbo].[tblContract] ADD  CONSTRAINT [DF_tblContract_ContactTypeID]  DEFAULT ((0)) FOR [ContactTypeID]
GO

ALTER TABLE [dbo].[tblContract] ADD  CONSTRAINT [DF_tblContract_EntrustingUnitID]  DEFAULT ((0)) FOR [EntrustingUnitID]
GO

ALTER TABLE [dbo].[tblContract] ADD  CONSTRAINT [DF_tblContract_PartyASignDate]  DEFAULT ('1900-01-01') FOR [PartyASignDate]
GO

ALTER TABLE [dbo].[tblContract] ADD  CONSTRAINT [DF_tblContract_PartyBSignDate]  DEFAULT ('1900-01-01') FOR [PartyBSignDate]
GO

ALTER TABLE [dbo].[tblContract] ADD  CONSTRAINT [DF_tblContract_InvestmentAmount]  DEFAULT ((0)) FOR [InvestmentAmount]
GO

ALTER TABLE [dbo].[tblContract] ADD  CONSTRAINT [DF_tblContract_DifficultyID]  DEFAULT ((0)) FOR [DifficultyID]
GO

ALTER TABLE [dbo].[tblContract] ADD  CONSTRAINT [DF_tblContract_ContractReturnFlagID]  DEFAULT ((0)) FOR [ContractReturnFlagID]
GO

ALTER TABLE [dbo].[tblContract] ADD  CONSTRAINT [DF_tblContract_ContractNatureID]  DEFAULT ((0)) FOR [ContractNatureID]
GO

ALTER TABLE [dbo].[tblContract] ADD  CONSTRAINT [DF_tblContract_DataStatusID]  DEFAULT ((1)) FOR [DataStatusId]
GO

ALTER TABLE [dbo].[tblContract] ADD  CONSTRAINT [DF_tblContract_DateCreated]  DEFAULT (getdate()) FOR [DateCreated]
GO

