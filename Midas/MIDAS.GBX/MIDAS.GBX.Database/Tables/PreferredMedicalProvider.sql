CREATE TABLE [dbo].[PreferredMedicalProvider](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[CompanyEmailId] NVARCHAR(100) NULL,
	[FirstName] [nvarchar](50) NULL,
	[LastName] NVARCHAR(50) NULL,
	[PreferredCompanyId] INT NULL,
	[ForCompanyId] [int] NOT NULL,
	[IsDeleted] [bit] NULL CONSTRAINT [DF_PreferredMedicalProvider_IsDeleted] DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
	CONSTRAINT [PK_PreferredMedicalProvider] PRIMARY KEY ([Id])
) 
GO

ALTER TABLE [dbo].[PreferredMedicalProvider]  WITH CHECK ADD  CONSTRAINT [FK_PreferredMedicalProvider_Company_PreferredCompanyId] FOREIGN KEY([PreferredCompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[PreferredMedicalProvider] CHECK CONSTRAINT [FK_PreferredMedicalProvider_Company_PreferredCompanyId]
GO

ALTER TABLE [dbo].[PreferredMedicalProvider]  WITH CHECK ADD  CONSTRAINT [FK_PreferredMedicalProvider_Company_ForCompanyId] FOREIGN KEY([ForCompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[PreferredMedicalProvider] CHECK CONSTRAINT [FK_PreferredMedicalProvider_Company_ForCompanyId]
GO
