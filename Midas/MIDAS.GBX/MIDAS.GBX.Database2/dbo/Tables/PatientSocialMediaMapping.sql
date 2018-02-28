CREATE TABLE [dbo].[PatientSocialMediaMapping] (
    [Id]             INT           IDENTITY (1, 1) NOT NULL,
    [PatientId]      INT           NOT NULL,
    [SocialMediaId]  TINYINT       NOT NULL,
    [IsDeleted]      BIT           DEFAULT ((0)) NULL,
    [CreateByUserID] INT           NOT NULL,
    [CreateDate]     DATETIME2 (7) NOT NULL,
    [UpdateByUserID] INT           NULL,
    [UpdateDate]     DATETIME2 (7) NULL,
    CONSTRAINT [PK_PatientSocialMediaMapping] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PatientSocialMediaMapping_Patient_PatientId] FOREIGN KEY ([PatientId]) REFERENCES [dbo].[Patient] ([Id]),
    CONSTRAINT [FK_PatientSocialMediaMapping_SocialMedia_SocialMediaId] FOREIGN KEY ([SocialMediaId]) REFERENCES [dbo].[SocialMedia] ([Id])
);

