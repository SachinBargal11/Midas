CREATE TABLE [dbo].[Attorney] (
    [Id]             INT           NOT NULL,
    [IsDeleted]      BIT           CONSTRAINT [DF_Attorney_IsDeleted] DEFAULT 0 NULL,
    [CreateByUserID] INT           NOT NULL,
    [CreateDate]     DATETIME2 (7) NOT NULL,
    [UpdateByUserID] INT           NULL,
    [UpdateDate]     DATETIME2 (7) NULL,
    CONSTRAINT [PK_AttorneyMaster] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Attorney_User_id] FOREIGN KEY ([Id]) REFERENCES [dbo].[User] ([id])
);

