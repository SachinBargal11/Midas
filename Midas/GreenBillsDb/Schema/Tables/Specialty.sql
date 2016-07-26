
CREATE TABLE [dbo].[Specialty](
	[ID] [INT] IDENTITY(1,1) NOT NULL,
	[Name] [NVARCHAR](50) NOT NULL,
	[SpecialityCode] [NVARCHAR](50) NOT NULL,
	[IsUnitApply] [BIT] NULL, -- Sugested By Vinay
	[IsDeleted] [BIT] NULL,
	[CreateByUserID] [INT] NOT NULL,
	[CreateDate] [DATETIME] NULL,
	[UpdateByUserID] [INT] NULL,
	[UpdateDate] [DATETIME] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Specialty]  WITH CHECK ADD  CONSTRAINT [FK_Specialty_User] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[Specialty] CHECK CONSTRAINT [FK_Specialty_User]
GO

ALTER TABLE [dbo].[Specialty]  WITH CHECK ADD  CONSTRAINT [FK_Specialty_User1] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[Specialty] CHECK CONSTRAINT [FK_Specialty_User1]
GO

EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'Should be Unique.',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Specialty',
    @level2type = N'COLUMN',
    @level2name = N'Name'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'AC',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Specialty',
    @level2type = N'COLUMN',
    @level2name = N'SpecialityCode'