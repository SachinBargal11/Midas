CREATE TABLE [dbo].[DiagnosisCode]
(
	[Id] INT NOT NULL IDENTITY,
	[DiagnosisTypeId] INT NOT NULL, 
    [DiagnosisCodeText] NVARCHAR(50) NOT NULL, 
    [DiagnosisCodeDesc] NVARCHAR(250) NULL, 
	[CompanyId] INT NULL, 

	[IsDeleted] [bit] NULL DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL, 
    CONSTRAINT [PK_DiagnosisCode] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[DiagnosisCode]  WITH CHECK ADD  CONSTRAINT [FK_DiagnosisCode_DiagnosisType_DiagnosisTypeId] FOREIGN KEY([DiagnosisTypeId])
	REFERENCES [dbo].[DiagnosisType] ([Id])
GO

ALTER TABLE [dbo].[DiagnosisCode] CHECK CONSTRAINT [FK_DiagnosisCode_DiagnosisType_DiagnosisTypeId]
GO

ALTER TABLE [dbo].[DiagnosisCode]  WITH CHECK ADD  CONSTRAINT [FK_DiagnosisCode_Company_CompanyId] FOREIGN KEY([CompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[DiagnosisCode] CHECK CONSTRAINT [FK_DiagnosisCode_Company_CompanyId]
GO
