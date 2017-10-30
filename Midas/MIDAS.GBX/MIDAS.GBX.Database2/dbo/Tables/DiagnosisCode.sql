CREATE TABLE [dbo].[DiagnosisCode] (
    [Id]                INT            IDENTITY (1, 1) NOT NULL,
    [DiagnosisTypeId]   INT            NOT NULL,
    [DiagnosisCodeText] NVARCHAR (50)  NOT NULL,
    [DiagnosisCodeDesc] NVARCHAR (250) NULL,
    [IsDeleted]         BIT            DEFAULT ((0)) NULL,
    [CreateByUserID]    INT            NOT NULL,
    [CreateDate]        DATETIME2 (7)  NOT NULL,
    [UpdateByUserID]    INT            NULL,
    [UpdateDate]        DATETIME2 (7)  NULL,
    CONSTRAINT [PK_DiagnosisCode] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_DiagnosisCode_DiagnosisType_DiagnosisTypeId] FOREIGN KEY ([DiagnosisTypeId]) REFERENCES [dbo].[DiagnosisType] ([Id])
);

