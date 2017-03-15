CREATE TABLE [dbo].[CaseCompanyLocationMapping]
(
	[Id] INT NOT NULL IDENTITY(1, 1),
	[CaseId] INT NOT NULL, 
    [CompanyId] INT NOT NULL, 
    [LocationId] INT NOT NULL, 

	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
    CONSTRAINT [PK_CaseCompanyLocationMapping] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[CaseCompanyLocationMapping]  WITH CHECK ADD  CONSTRAINT [FK_CaseCompanyLocationMapping_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO

ALTER TABLE [dbo].[CaseCompanyLocationMapping] CHECK CONSTRAINT [FK_CaseCompanyLocationMapping_Case_CaseId]
GO

ALTER TABLE [dbo].[CaseCompanyLocationMapping]  WITH CHECK ADD  CONSTRAINT [FK_CaseCompanyLocationMapping_Company_CompanyId] FOREIGN KEY([CompanyId])
	REFERENCES [dbo].[Company] ([id])
GO

ALTER TABLE [dbo].[CaseCompanyLocationMapping] CHECK CONSTRAINT [FK_CaseCompanyLocationMapping_Company_CompanyId]
GO

ALTER TABLE [dbo].[CaseCompanyLocationMapping]  WITH CHECK ADD  CONSTRAINT [FK_CaseCompanyLocationMapping_Location_LocationId] FOREIGN KEY([LocationId])
	REFERENCES [dbo].[Location] ([id])
GO

ALTER TABLE [dbo].[CaseCompanyLocationMapping] CHECK CONSTRAINT [FK_CaseCompanyLocationMapping_Location_LocationId]
GO
