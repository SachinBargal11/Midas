CREATE TABLE [dbo].[Case](
	[CaseId] [int] IDENTITY(1,1) NOT NULL,
	[CaseTypeId] [int] NULL,
	[MedicalFacilitiesID] [int] NULL,
	[PatientInsuranceId] [int] NULL,
	[CaseStatusId] [int] NULL,
	[AttorneyId] [int] NULL,
	[PatientID] [int] NULL,
	[ClaimNumber] [nvarchar](50) NULL,
	[DateOfAccident] [datetime] NULL,
	[AdjusterId] [int] NULL,
	[CaseDate] [datetime] NULL,
	[CaseNo] [int] NULL,
	[LocationId] [int] NULL,
	[IsSoftDeleted] [bit] NULL,
	[RemoteCaseID] [nvarchar](50) NULL,
	[ReferringProviderId] [int] NULL,
	[DiagnosisForSpecialty] [nvarchar](2000) NULL,
	[EmployerId] [int] NULL,
	[EmployerAddressId] [int] NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime] NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime] NULL,
 CONSTRAINT [PK__Case__6CAE524C31CE0624] PRIMARY KEY CLUSTERED 
(
	[CaseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_Case] FOREIGN KEY([CaseId])
REFERENCES [dbo].[Case] ([CaseId])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_Case]
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_Employer] FOREIGN KEY([EmployerId])
REFERENCES [dbo].[Employer] ([ID])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_Employer]
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_EmployerAddress] FOREIGN KEY([EmployerAddressId])
REFERENCES [dbo].[EmployerAddress] ([ID])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_EmployerAddress]
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



EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'http://www.investopedia.com/terms/c/claims-adjuster.asp',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Case',
    @level2type = N'COLUMN',
    @level2name = N'AdjusterId'