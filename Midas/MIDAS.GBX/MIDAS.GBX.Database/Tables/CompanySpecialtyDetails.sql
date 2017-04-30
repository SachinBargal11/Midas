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
	--[MandatoryProcCode] [BIT] NULL DEFAULT 0,
	[IsDeleted] [bit] NULL CONSTRAINT [DF_CompanySpecialtyDetails_IsDeleted]  DEFAULT ((0)),
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
 CONSTRAINT [PK_CompanySpecialtyDetails] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
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

ALTER TABLE [dbo].[CompanySpecialtyDetails]  WITH CHECK ADD CONSTRAINT [UK_SpecialtyId_CompanyID] UNIQUE ([SpecialtyId], [CompanyID])
GO

ALTER TABLE [dbo].[CompanySpecialtyDetails] CHECK CONSTRAINT [UK_SpecialtyId_CompanyID]
GO

/*
ALTER TABLE [dbo].[CompanySpecialtyDetails] ADD [MandatoryProcCode] [BIT] NULL DEFAULT 0
GO
UPDATE [dbo].[CompanySpecialtyDetails] SET [MandatoryProcCode] = 0
GO
ALTER TABLE [dbo].[CompanySpecialtyDetails] ALTER COLUMN [MandatoryProcCode] [BIT] NOT NULL
GO
*/
/*
ALTER TABLE [dbo].[CompanySpecialtyDetails] DROP [MandatoryProcCode]
*/