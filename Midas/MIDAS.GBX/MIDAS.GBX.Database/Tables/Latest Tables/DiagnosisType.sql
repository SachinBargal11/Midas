CREATE TABLE [dbo].[DiagnosisType]
(
	[Id] INT NOT NULL IDENTITY,
	[DiagnosisTypeText] NVARCHAR(50) NULL, 
    [CompanyId] INT NULL, 

	[IsDeleted] [bit] NULL DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL, 
    CONSTRAINT [PK_DiagnosisType] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[DiagnosisType]  WITH CHECK ADD  CONSTRAINT [FK_DiagnosisType_Company_CompanyId] FOREIGN KEY([CompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[DiagnosisType] CHECK CONSTRAINT [FK_DiagnosisType_Company_CompanyId]
GO
