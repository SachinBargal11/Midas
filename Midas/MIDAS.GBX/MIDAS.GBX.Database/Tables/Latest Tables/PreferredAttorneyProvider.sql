CREATE TABLE [dbo].[PreferredAttorneyProvider]
(
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PrefAttorneyProviderId] INT NOT NULL,
	[CompanyId] INT NOT NULL,
	[IsCreated] BIT NOT NULL CONSTRAINT [DF_PreferredAttorneyProvider_IsCreated] DEFAULT 0,
	[IsDeleted] [bit] NULL CONSTRAINT [DF_PreferredAttorneyProvider_IsDeleted] DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
	CONSTRAINT [PK_PreferredAttorneyProvider] PRIMARY KEY ([Id])
) 
GO

ALTER TABLE [dbo].[PreferredAttorneyProvider]  WITH CHECK ADD  CONSTRAINT [FK_PreferredAttorneyProvider_Company_PrefAttorneyProviderId] FOREIGN KEY([PrefAttorneyProviderId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[PreferredAttorneyProvider] CHECK CONSTRAINT [FK_PreferredAttorneyProvider_Company_PrefAttorneyProviderId]
GO

ALTER TABLE [dbo].[PreferredAttorneyProvider]  WITH CHECK ADD  CONSTRAINT [FK_PreferredAttorneyProvider_Company_CompanyId] FOREIGN KEY([CompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[PreferredAttorneyProvider] CHECK CONSTRAINT [FK_PreferredAttorneyProvider_Company_CompanyId]
GO
