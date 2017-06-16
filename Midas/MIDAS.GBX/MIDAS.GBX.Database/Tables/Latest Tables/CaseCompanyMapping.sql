CREATE TABLE [dbo].[CaseCompanyMapping]
(
	[Id] INT NOT NULL IDENTITY(1, 1),
	[CaseId] INT NOT NULL, 
    [CompanyId] INT NOT NULL, 
    [IsOriginator] [bit] NOT NULL DEFAULT 0,
    [AddedByCompanyId] INT NOT NULL,
	[IsDeleted] [bit] NULL DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
    CONSTRAINT [PK_CaseCompanyLocationMapping] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[CaseCompanyMapping]  WITH CHECK ADD  CONSTRAINT [FK_CaseCompanyMapping_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO

ALTER TABLE [dbo].[CaseCompanyMapping] CHECK CONSTRAINT [FK_CaseCompanyMapping_Case_CaseId]
GO

ALTER TABLE [dbo].[CaseCompanyMapping]  WITH CHECK ADD  CONSTRAINT [FK_CaseCompanyMapping_Company_CompanyId] FOREIGN KEY([CompanyId])
	REFERENCES [dbo].[Company] ([id])
GO

ALTER TABLE [dbo].[CaseCompanyMapping] CHECK CONSTRAINT [FK_CaseCompanyMapping_Company_CompanyId]
GO

--ALTER TABLE [dbo].[CaseCompanyMapping] ADD [AddedByCompanyId] INT NULL
--GO

ALTER TABLE [dbo].[CaseCompanyMapping]  WITH CHECK ADD  CONSTRAINT [FK_CaseCompanyMapping_Company_AddedByCompanyId] FOREIGN KEY([AddedByCompanyId])
	REFERENCES [dbo].[Company] ([id])
GO

ALTER TABLE [dbo].[CaseCompanyMapping] CHECK CONSTRAINT [FK_CaseCompanyMapping_Company_AddedByCompanyId]
GO
/*
UPDATE [dbo].[CaseCompanyMapping] SET [AddedByCompanyId] = [CompanyId] WHERE [IsOriginator] = 1
GO
UPDATE [dbo].[CaseCompanyMapping] SET [AddedByCompanyId] = (SELECT TOP 1 [CompanyId] FROM [dbo].[CaseCompanyMapping] AS tbl1 WHERE [CaseId] = tbl1.[CaseId] AND [IsOriginator] = 1) WHERE [IsOriginator] = 0
GO
*/
--ALTER TABLE [dbo].[CaseCompanyMapping] ALTER COLUMN [AddedByCompanyId] INT NOT NULL
--GO
