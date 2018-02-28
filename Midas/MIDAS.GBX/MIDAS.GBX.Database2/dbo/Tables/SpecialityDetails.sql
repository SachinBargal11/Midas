CREATE TABLE [dbo].[SpecialityDetails] (
    [id]                  INT           IDENTITY (1, 1) NOT NULL,
    [SpecialtyId]         INT           NULL,
    [ReevalDays]          INT           NULL,
    [ReevalVisitCount]    INT           NULL,
    [InitialDays]         INT           NULL,
    [InitialVisitCount]   INT           NULL,
    [MaxReval]            INT           NULL,
    [IsInitialEvaluation] BIT           NULL,
    [Include1500]         BIT           NOT NULL,
    [AssociatedSpecialty] INT           NULL,
    [AllowMultipleVisit]  BIT           NULL,
    [IsDeleted]           BIT           CONSTRAINT [DF_SpecialityDetails_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID]      INT           NOT NULL,
    [CreateDate]          DATETIME2 (7) NULL,
    [UpdateByUserID]      INT           NULL,
    [UpdateDate]          DATETIME2 (7) NULL,
    CONSTRAINT [PK_SpecialityDetails] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_SpecialityDetails_Specialty] FOREIGN KEY ([SpecialtyId]) REFERENCES [dbo].[Specialty] ([id])
);

