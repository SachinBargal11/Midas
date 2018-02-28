CREATE TABLE [dbo].[GeneralSettings]
(	
    [Id] INT NOT NULL IDENTITY, 
    [CompanyId] INT NOT NULL,
    [SlotDuration] INT NOT NULL CONSTRAINT [DF_GeneralSettings_SlotDuration] DEFAULT 30, 

    [IsDeleted] [bit] NULL DEFAULT 0,
    [CreateByUserID] [int] NOT NULL,
    [CreateDate] [datetime2](7) NOT NULL,
    [UpdateByUserID] [int] NULL,
    [UpdateDate] [datetime2](7) NULL, 
    CONSTRAINT [PK_GeneralSettings] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[GeneralSettings]  WITH CHECK ADD  CONSTRAINT [FK_GeneralSettings_Company_CompanyId] FOREIGN KEY([CompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[GeneralSettings] CHECK CONSTRAINT [FK_GeneralSettings_Company_CompanyId]
GO
