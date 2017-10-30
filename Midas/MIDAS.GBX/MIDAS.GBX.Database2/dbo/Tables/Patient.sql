CREATE TABLE [dbo].[Patient] (
    [Id]                      INT            NOT NULL,
    [SSN]                     NVARCHAR (20)  NOT NULL,
    [Weight]                  DECIMAL (5, 2) NULL,
    [Height]                  DECIMAL (5, 2) NULL,
    [MaritalStatusId]         TINYINT        NULL,
    [DateOfFirstTreatment]    DATETIME2 (7)  NULL,
    [IsDeleted]               BIT            DEFAULT ((0)) NULL,
    [CreateByUserID]          INT            NOT NULL,
    [CreateDate]              DATETIME2 (7)  NOT NULL,
    [UpdateByUserID]          INT            NULL,
    [UpdateDate]              DATETIME2 (7)  NULL,
    [ParentOrGuardianName]    NVARCHAR (256) NULL,
    [EmergencyContactName]    NVARCHAR (256) NULL,
    [EmergencyContactPhone]   NVARCHAR (256) NULL,
    [LegallyMarried]          BIT            DEFAULT ((0)) NULL,
    [SpouseName]              NVARCHAR (256) NULL,
    [LanguagePreferenceOther] NVARCHAR (256) NULL,
    CONSTRAINT [PK_Patient] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Patient_MaritalStatusId] FOREIGN KEY ([MaritalStatusId]) REFERENCES [dbo].[MaritalStatus] ([Id]),
    CONSTRAINT [FK_Patient_User_id] FOREIGN KEY ([Id]) REFERENCES [dbo].[User] ([id])
);

