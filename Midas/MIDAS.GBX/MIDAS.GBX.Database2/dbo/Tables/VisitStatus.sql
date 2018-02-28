CREATE TABLE [dbo].[VisitStatus] (
    [ID]        INT          IDENTITY (1, 1) NOT NULL,
    [NAME]      VARCHAR (50) NULL,
    [IsDeleted] BIT          DEFAULT ((0)) NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC)
);

