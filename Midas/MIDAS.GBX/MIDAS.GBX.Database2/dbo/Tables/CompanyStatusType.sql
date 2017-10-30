CREATE TABLE [dbo].[CompanyStatusType] (
    [ID]        INT          IDENTITY (1, 1) NOT NULL,
    [Name]      VARCHAR (50) NULL,
    [IsDeleted] BIT          DEFAULT ((0)) NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC)
);

