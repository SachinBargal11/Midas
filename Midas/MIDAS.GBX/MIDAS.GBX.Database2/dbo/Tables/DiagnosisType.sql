CREATE TABLE [dbo].[DiagnosisType] (
    [Id]                INT           IDENTITY (1, 1) NOT NULL,
    [DiagnosisTypeText] NVARCHAR (50) NULL,
    [IsDeleted]         BIT           DEFAULT ((0)) NULL,
    [CreateByUserID]    INT           NOT NULL,
    [CreateDate]        DATETIME2 (7) NOT NULL,
    [UpdateByUserID]    INT           NULL,
    [UpdateDate]        DATETIME2 (7) NULL,
    [ICDTypeCodeID]     INT           DEFAULT ((1)) NOT NULL,
    CONSTRAINT [PK_DiagnosisType] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_DiagnosisType_ICDTypeCode] FOREIGN KEY ([ICDTypeCodeID]) REFERENCES [dbo].[ICDTypeCode] ([Id])
);

