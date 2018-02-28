CREATE TABLE [dbo].[PatientType] (
    [Id]              TINYINT       NOT NULL,
    [PatientTypeText] NVARCHAR (50) NOT NULL,
    [IsDeleted]       BIT           NULL,
    CONSTRAINT [PK_PatientType] PRIMARY KEY CLUSTERED ([Id] ASC)
);

