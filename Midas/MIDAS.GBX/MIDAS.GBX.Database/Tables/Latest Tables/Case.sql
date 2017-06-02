CREATE TABLE [dbo].[Case](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PatientId] [int] NOT NULL,
	[CaseName] [nvarchar](50) NULL,
	[CaseTypeId] [TINYINT] NULL,
	[LocationId] [int] NOT NULL,
	[PatientEmpInfoId] [int] NULL,
	[CarrierCaseNo] [nvarchar](50) NULL,
	[CaseStatusId] [TINYINT] NULL,
	[AttorneyId] [int] NULL,
    [CreatedByCompanyId] [INT] NOT NULL,

	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
	CONSTRAINT [PK_Case] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_Location_LocationID] FOREIGN KEY([LocationId])
	REFERENCES [dbo].[Location] ([id])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_Location_LocationID]
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_Patient2_PatientId] FOREIGN KEY([PatientId])
	REFERENCES [dbo].[Patient2] ([Id])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_Patient2_PatientId]
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_PatientEmpInfo_PatientEmpInfoId] FOREIGN KEY([PatientEmpInfoId])
	REFERENCES [dbo].[PatientEmpInfo] ([Id])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_PatientEmpInfo_PatientEmpInfoId]
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_CaseType_CaseTypeId] FOREIGN KEY([CaseTypeId])
	REFERENCES [dbo].[CaseType] ([Id])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_CaseType_CaseTypeId]
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_CaseStatus_CaseStatusId] FOREIGN KEY([CaseStatusId])
	REFERENCES [dbo].[CaseStatus] ([Id])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_CaseStatus_CaseStatusId]
GO

--ALTER TABLE [dbo].[Case] DROP [LocationId]
--ALTER TABLE [dbo].[Case] ADD [FileUploadPath] [NVARCHAR](250) NULL

/*
ALTER TABLE [dbo].[Case] DROP CONSTRAINT [DF__Case__Transporta__1387E197]
GO
ALTER TABLE [dbo].[Case] DROP COLUMN [Transportation]
GO
ALTER TABLE [dbo].[Case] DROP COLUMN [FileUploadPath]
GO
*/

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_Company_AttorneyId] FOREIGN KEY([AttorneyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_Company_AttorneyId]
GO

/*
ALTER TABLE [dbo].[Case] ADD [CreatedByCompanyId] [INT] NULL
GO
UPDATE [dbo].[Case] SET [dbo].[Case].[CreatedByCompanyId] = (SELECT TOP 1 [CompanyId] FROM [dbo].[CaseCompanyMapping] AS tbl2 WHERE tbl2.[CaseId] = [dbo].[Case].[Id] AND (tbl2.[IsDeleted] = 0 OR tbl2.[IsDeleted] IS NULL))
GO
UPDATE [dbo].[Case] SET [dbo].[Case].[CreatedByCompanyId] = (SELECT TOP 1 [CompanyId] FROM [dbo].[CaseCompanyMapping] AS tbl2 WHERE tbl2.[CaseId] = [dbo].[Case].[Id]) 
    WHERE [dbo].[Case].[CreatedByCompanyId] IS NULL
GO
UPDATE [dbo].[Case] SET [dbo].[Case].[CreatedByCompanyId] = 1 WHERE [dbo].[Case].[CreatedByCompanyId] IS NULL
GO
ALTER TABLE [dbo].[Case] ALTER COLUMN [CreatedByCompanyId] [INT] NOT NULL
GO
*/

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_Company_CreatedByCompanyId] FOREIGN KEY([CreatedByCompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_Company_CreatedByCompanyId]
GO
