CREATE TABLE [dbo].[PatientLanguagePreferenceMapping] (
    [Id]                   INT           IDENTITY (1, 1) NOT NULL,
    [PatientId]            INT           NOT NULL,
    [LanguagePreferenceId] TINYINT       NOT NULL,
    [IsDeleted]            BIT           DEFAULT ((0)) NULL,
    [CreateByUserID]       INT           NOT NULL,
    [CreateDate]           DATETIME2 (7) NOT NULL,
    [UpdateByUserID]       INT           NULL,
    [UpdateDate]           DATETIME2 (7) NULL,
    CONSTRAINT [PK_PatientLanguagePreferenceMapping] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PatientLanguagePreferenceMapping_LanguagePreference_LanguagePreferenceId] FOREIGN KEY ([LanguagePreferenceId]) REFERENCES [dbo].[LanguagePreference] ([Id]),
    CONSTRAINT [FK_PatientLanguagePreferenceMapping_Patient_PatientId] FOREIGN KEY ([PatientId]) REFERENCES [dbo].[Patient] ([Id])
);

