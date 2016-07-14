
CREATE TABLE [dbo].[Patient](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NULL,
	[SSN] [nvarchar](50) NULL,
	[WCBNO] [nvarchar](50) NULL,
	[JobTitle] [nvarchar](50) NULL,
	MarriedStatus tinyint,
	[WorkActivities] [nvarchar](50) NULL,
	[CarrierCaseNo] [nvarchar](50) NULL,
	[UseTranspotation] [bit] NULL,
	[ChartNo] [nvarchar](50) NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime] NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_Insurance] FOREIGN KEY([ID])
REFERENCES [dbo].[Insurance] ([ID])
GO

ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_Insurance]
GO

ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_ProviderMedicalOffices] FOREIGN KEY(ID)
REFERENCES [dbo].[ProviderMedicalFacilities] ([ID])
GO

ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_ProviderMedicalOffices]
GO

ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_User]
GO

ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_User1] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_User1]
GO

ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_User2] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_User2]
GO


--Comments for Patient,

GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'Workers'' Compensation Board',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Patient',
    @level2type = N'COLUMN',
    @level2name = N'WCBNO'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'Social security number',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Patient',
    @level2type = N'COLUMN',
    @level2name = N'SSN'