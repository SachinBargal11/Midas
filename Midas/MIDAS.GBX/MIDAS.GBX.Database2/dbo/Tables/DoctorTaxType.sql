CREATE TABLE [dbo].[DoctorTaxType] (
    [Id]             TINYINT        IDENTITY (1, 1) NOT NULL,
    [Name]           NVARCHAR (50)  NOT NULL,
    [Description]    NVARCHAR (128) NULL,
    [IsDeleted]      BIT            CONSTRAINT [DF_DoctorTaxType_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID] INT            NOT NULL,
    [CreateDate]     DATETIME2 (7)  NOT NULL,
    [UpdateByUserID] INT            NULL,
    [UpdateDate]     DATETIME2 (7)  NULL,
    CONSTRAINT [PK_DoctorTaxType] PRIMARY KEY CLUSTERED ([Id] ASC)
);

