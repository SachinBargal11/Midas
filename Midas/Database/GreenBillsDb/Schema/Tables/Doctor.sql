
CREATE TABLE [dbo].[Doctor](
	[ID] [INT] NOT NULL,
	[DoctorUserId] [INT] NULL,
	[SpecialityID] [NVARCHAR](50) NULL,
	[LicenseNumber] [NVARCHAR](50) NULL,
	[WCBAuthorization] [NVARCHAR](50) NULL,
	[WcbRatingCode] [NVARCHAR](50) NULL,
	[NPI] [NVARCHAR](50) NULL,
	[FederalTaxId] [NVARCHAR](50) NULL,
	[TaxType] [TINYINT] NULL,
	[AssignNumber] [NVARCHAR](50) NULL,
	[Title] [NVARCHAR](10) NULL,
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

ALTER TABLE [dbo].[Doctor]  WITH CHECK ADD  CONSTRAINT [FK_Doctor_User] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[Doctor] CHECK CONSTRAINT [FK_Doctor_User]
GO

ALTER TABLE [dbo].[Doctor]  WITH CHECK ADD  CONSTRAINT [FK_Doctor_User1] FOREIGN KEY([DoctorUserId])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[Doctor] CHECK CONSTRAINT [FK_Doctor_User1]
GO

ALTER TABLE [dbo].[Doctor]  WITH CHECK ADD  CONSTRAINT [FK_Doctor_User2] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[Doctor] CHECK CONSTRAINT [FK_Doctor_User2]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'-  Doctor spaciality seperate table' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Doctor', @level2type=N'COLUMN',@level2name=N'SpecialityID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SSN=1,EIN=2,ITIN=3,ATIN=4,PTIN=5 (https://www.irs.gov/individuals/international-taxpayers/taxpayer-identification-numbers-tin)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Doctor', @level2type=N'COLUMN',@level2name=N'TaxType'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'?' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Doctor', @level2type=N'COLUMN',@level2name=N'AssignNumber'
GO


GO


