CREATE TABLE [dbo].[PreferredAncillaryProvider](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PrefAncillaryProviderId] [int] NOT NULL,
	[CompanyId] [int] NOT NULL,
	[IsCreated] [bit] NOT NULL CONSTRAINT [DF_PreferredAncillaryProvider_IsCreated]  DEFAULT ((0)),
	[IsDeleted] [bit] NULL CONSTRAINT [DF_PreferredAncillaryProvider_IsDeleted]  DEFAULT ((0)),
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
 CONSTRAINT [PK_PreferredAncillaryProvider] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[PreferredAncillaryProvider]  WITH CHECK ADD  CONSTRAINT [FK_PreferredAncillaryProvider_Company_CompanyId] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[Company] ([id])
GO

ALTER TABLE [dbo].[PreferredAncillaryProvider] CHECK CONSTRAINT [FK_PreferredAncillaryProvider_Company_CompanyId]
GO

ALTER TABLE [dbo].[PreferredAncillaryProvider]  WITH CHECK ADD  CONSTRAINT [FK_PreferredAncillaryProvider_Company_PrefAncillaryProviderId] FOREIGN KEY([PrefAncillaryProviderId])
REFERENCES [dbo].[Company] ([id])
GO

ALTER TABLE [dbo].[PreferredAncillaryProvider] CHECK CONSTRAINT [FK_PreferredAncillaryProvider_Company_PrefAncillaryProviderId]
GO
