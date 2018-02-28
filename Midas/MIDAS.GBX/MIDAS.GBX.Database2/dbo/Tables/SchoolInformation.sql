CREATE TABLE [dbo].[SchoolInformation] (
    [Id]               INT            IDENTITY (1, 1) NOT NULL,
    [CaseId]           INT            NOT NULL,
    [NameOfSchool]     NVARCHAR (256) NOT NULL,
    [Grade]            NVARCHAR (50)  NULL,
    [LossOfTime]       BIT            CONSTRAINT [DF_SchoolInformation_LossOfTime] DEFAULT ((0)) NULL,
    [DatesOutOfSchool] NVARCHAR (128) NULL,
    [IsDeleted]        BIT            NULL,
    [CreateByUserID]   INT            NOT NULL,
    [CreateDate]       DATETIME2 (7)  NOT NULL,
    [UpdateByUserID]   INT            NULL,
    [UpdateDate]       DATETIME2 (7)  NULL,
    CONSTRAINT [PK_SchoolInformation] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_SchoolInformation_Case_CaseId] FOREIGN KEY ([CaseId]) REFERENCES [dbo].[Case] ([Id])
);

