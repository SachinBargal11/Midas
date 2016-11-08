CREATE TABLE [dbo].[MedicalProviderLocation](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[MedicalProviderID] [int] NOT NULL,
	[LocationID] [int] NOT NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
 CONSTRAINT [PK_MedicalProviderLocation] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[MedicalProviderLocation]  WITH CHECK ADD  CONSTRAINT [FK_MedicalProviderLocation_Location] FOREIGN KEY([LocationID])
REFERENCES [dbo].[Location] ([id])
GO

ALTER TABLE [dbo].[MedicalProviderLocation] CHECK CONSTRAINT [FK_MedicalProviderLocation_Location]
GO

ALTER TABLE [dbo].[MedicalProviderLocation]  WITH CHECK ADD  CONSTRAINT [FK_MedicalProviderLocation_MedicalProvider] FOREIGN KEY([MedicalProviderID])
REFERENCES [dbo].[MedicalProvider] ([id])
GO

ALTER TABLE [dbo].[MedicalProviderLocation] CHECK CONSTRAINT [FK_MedicalProviderLocation_MedicalProvider]
GO