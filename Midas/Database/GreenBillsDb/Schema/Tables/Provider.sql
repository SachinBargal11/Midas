
CREATE TABLE [dbo].[Provider](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[NPI] [nvarchar](10) NULL,
	[FederalTaxId] [nvarchar](50) NULL,
	[Prefix] [nvarchar](5) NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime] NULL,
 CONSTRAINT [PK__Provider__3214EC27DAA66C03] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO





ALTER TABLE [dbo].[Provider]  WITH CHECK ADD  CONSTRAINT [FK_Provider_User] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[Provider] CHECK CONSTRAINT [FK_Provider_User]
GO

ALTER TABLE [dbo].[Provider]  WITH CHECK ADD  CONSTRAINT [FK_Provider_User1] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[Provider] CHECK CONSTRAINT [FK_Provider_User1]
GO



EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'A National Provider Identifier or NPI is a unique 10-digit identification number issued to health care providers in the United S',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Provider',
    @level2type = N'COLUMN',
    @level2name = N'NPI'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'The Social Security number of an individual or the Employer Identification Number of a business, fiduciary or other organization',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Provider',
    @level2type = N'COLUMN',
    @level2name = N'FederalTaxId'