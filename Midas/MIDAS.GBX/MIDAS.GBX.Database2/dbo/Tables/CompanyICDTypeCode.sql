CREATE TABLE [dbo].[CompanyICDTypeCode] (
    [Id]              INT      IDENTITY (1, 1) NOT NULL,
    [CompanyID]       INT      NOT NULL,
    [ICDTypeCodeID]   INT      NOT NULL,
    [IsDeleted]       BIT      DEFAULT ((0)) NULL,
    [CreatedByUserID] INT      NOT NULL,
    [CreateDate]      DATETIME DEFAULT (getdate()) NULL,
    [UpdatedByUserID] INT      NULL,
    [UpdateDate]      DATETIME NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Company_ICDTypeCode] FOREIGN KEY ([ICDTypeCodeID]) REFERENCES [dbo].[ICDTypeCode] ([Id])
);

