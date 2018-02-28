CREATE TABLE [dbo].[DoctorSpecialities] (
    [id]             INT           IDENTITY (1, 1) NOT NULL,
    [DoctorID]       INT           NOT NULL,
    [SpecialityID]   INT           NOT NULL,
    [IsDeleted]      BIT           CONSTRAINT [DF_DoctorSpecialities_IsDeleted] DEFAULT ((0)) NOT NULL,
    [CreateByUserID] INT           NOT NULL,
    [CreateDate]     DATETIME2 (7) NOT NULL,
    [UpdateByUserID] INT           NULL,
    [UpdateDate]     DATETIME2 (7) NULL,
    CONSTRAINT [PK_DoctorSpecialities] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_DoctorSpecialities_Doctor_DoctorID] FOREIGN KEY ([DoctorID]) REFERENCES [dbo].[Doctor] ([Id]),
    CONSTRAINT [FK_DoctorSpecialities_Specialty] FOREIGN KEY ([SpecialityID]) REFERENCES [dbo].[Specialty] ([id])
);

