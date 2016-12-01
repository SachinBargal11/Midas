CREATE TABLE [dbo].[CompanySpecialtyDetails](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[SpecialtyId] [int] NULL,
	[CompanyID] [int] NULL,
	[ReevalDays] [int] NULL,
	[ReevalVisitCount] [int] NULL,
	[InitialDays] [int] NULL,
	[InitialVisitCount] [int] NULL,
	[MaxReval] [int] NULL,
	[IsInitialEvaluation] [bit] NULL,
	[Include1500] [bit] NULL,
	[AssociatedSpecialty] [int] NULL,
	[AllowMultipleVisit] [bit] NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[CompanySpecialtyDetails]  WITH CHECK ADD  CONSTRAINT [FK_CompanySpecialtyDetails_Company] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[Company] ([id])
GO

ALTER TABLE [dbo].[CompanySpecialtyDetails] CHECK CONSTRAINT [FK_CompanySpecialtyDetails_Company]
GO

ALTER TABLE [dbo].[CompanySpecialtyDetails]  WITH CHECK ADD  CONSTRAINT [FK_CompanySpecialtyDetails_Specialty] FOREIGN KEY([SpecialtyId])
REFERENCES [dbo].[Specialty] ([id])
GO

ALTER TABLE [dbo].[CompanySpecialtyDetails] CHECK CONSTRAINT [FK_CompanySpecialtyDetails_Specialty]
GO