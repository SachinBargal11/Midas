
CREATE TABLE [dbo].[SpecialtyDetails](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[SpecialtyId] [int] NULL,
	[ReevalDays] [int] NULL,
	[ReevalVisitCount] [int] NULL,
	[InitialDays] [int] NULL,
	[InitialVisitCount] [int] NULL,
	[MaxReval] [int] NULL,
	[IsInitialEvaluation] [bit] NULL,
	[Include1500] [bit] NULL,
	[AssociatedSpecialty] [int] NULL,
	[AllowMultipleVisit] [bit] NULL,
	[MedicalFacilitiesID] [int] NULL DEFAULT X,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[SpecialtyDetails]  WITH CHECK ADD  CONSTRAINT [FK_SpecialtyDetails_Specialty] FOREIGN KEY([SpecialtyId])
REFERENCES [dbo].[Specialty] ([id])
GO

ALTER TABLE [dbo].[SpecialtyDetails] CHECK CONSTRAINT [FK_SpecialtyDetails_Specialty]
GO


