CREATE TABLE [dbo].[CaseCompanyMapping]
(
	[Id] INT NOT NULL IDENTITY(1, 1),
	[CaseId] INT NOT NULL, 
    [CompanyId] INT NOT NULL, 
--	[DoctorId] INT NULL,
	
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

--ALTER TABLE [dbo].[CaseCompanyDoctorMapping]  WITH CHECK ADD  CONSTRAINT [FK_CaseCompanyDoctorMapping_Doctor_DoctorId] FOREIGN KEY([DoctorId])
--	REFERENCES [dbo].[Doctor] ([id])
--GO

--ALTER TABLE [dbo].[CaseCompanyDoctorMapping] CHECK CONSTRAINT [FK_CaseCompanyDoctorMapping_Doctor_DoctorId]
--GO
