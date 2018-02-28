CREATE TABLE [dbo].[InsuranceType] (
    [Id]                TINYINT       NOT NULL,
    [InsuranceTypeText] NVARCHAR (50) NOT NULL,
    [IsDeleted]         BIT           NULL,
    CONSTRAINT [PK_InsuranceType] PRIMARY KEY CLUSTERED ([Id] ASC)
);

