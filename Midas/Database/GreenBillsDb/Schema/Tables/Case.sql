CREATE TABLE [dbo].[Case](
	[CaseId] [INT] IDENTITY(1,1) NOT NULL,
	[CaseTypeId] [INT] NULL,
	[MedicalFacilitiesID] [INT] NULL,
	[PatientInsuranceId] [INT] NULL,
	[CaseStatusId] [INT] NULL,
	[AttorneyId] [INT] NULL,
	[PatientID] [INT] NULL,
	[ClaimNumber] [NVARCHAR](50) NULL,
	[DateOfAccident] [DATETIME] NULL,
	[AdjusterId] [INT] NULL,
	[CaseDate] [DATETIME] NULL,
	[CaseNo] [INT] NULL,
	[LocationId] [INT] NULL,
	[IsSoftDeleted] [BIT] NULL,
	[RemoteCaseID] [NVARCHAR](50) NULL,
	[ReferringProviderId] [INT] NULL,
	[DiagnosisForSpecialty] [NVARCHAR](2000) NULL,
	[EmployerId] [INT] NULL,
	[EmployerAddressId] [INT] NULL,
	[IsDeleted] [BIT] NULL,
	[CreateByUserID] [INT] NOT NULL,
	[CreateDate] [DATETIME] NULL,
	[UpdateByUserID] [INT] NULL,
	[UpdateDate] [DATETIME] NULL,
PRIMARY KEY CLUSTERED 
(
	[CaseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_Patient] FOREIGN KEY([PatientID])
REFERENCES [dbo].[Patient] ([ID])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_Patient]
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_User] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_User]
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_User1] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_User1]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Open=1,Close=2,Pending=3' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Case', @level2type=N'COLUMN',@level2name=N'CaseStatusId'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'FK from User table' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Case', @level2type=N'COLUMN',@level2name=N'AttorneyId'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'FK from User table' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Case', @level2type=N'COLUMN',@level2name=N'DateOfAccident'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Serial no required for ease of use....' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Case', @level2type=N'COLUMN',@level2name=N'CaseNo'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'For billing' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Case', @level2type=N'COLUMN',@level2name=N'LocationId'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'?' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Case', @level2type=N'COLUMN',@level2name=N'ReferringProviderId'
GO


