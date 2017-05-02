CREATE TABLE [dbo].[PreferredMedicalProvider](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PrefMedProviderId] INT NOT NULL,
	[CompanyId] INT NOT NULL,
	[IsCreated] BIT NOT NULL CONSTRAINT [DF_PreferredMedicalProvider_IsCreated] DEFAULT 0,
	[IsDeleted] [bit] NULL CONSTRAINT [DF_PreferredMedicalProvider_IsDeleted] DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
	CONSTRAINT [PK_PreferredMedicalProvider] PRIMARY KEY ([Id])
) 
GO

ALTER TABLE [dbo].[PreferredMedicalProvider]  WITH CHECK ADD  CONSTRAINT [FK_PreferredMedicalProvider_Company_PrefMedProviderId] FOREIGN KEY([PrefMedProviderId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[PreferredMedicalProvider] CHECK CONSTRAINT [FK_PreferredMedicalProvider_Company_PrefMedProviderId]
GO

ALTER TABLE [dbo].[PreferredMedicalProvider]  WITH CHECK ADD  CONSTRAINT [FK_PreferredMedicalProvider_Company_CompanyId] FOREIGN KEY([CompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[PreferredMedicalProvider] CHECK CONSTRAINT [FK_PreferredMedicalProvider_Company_CompanyId]
GO
