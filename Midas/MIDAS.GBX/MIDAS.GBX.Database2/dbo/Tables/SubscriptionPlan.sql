CREATE TABLE [dbo].[SubscriptionPlan] (
    [id]             INT           IDENTITY (1, 1) NOT NULL,
    [Name]           NVARCHAR (50) NOT NULL,
    [IsDeleted]      BIT           CONSTRAINT [DF_SubscriptionPlan_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID] INT           NOT NULL,
    [CreateDate]     DATETIME2 (7) NOT NULL,
    [UpdateByUserID] INT           NULL,
    [UpdateDate]     DATETIME2 (7) NULL,
    CONSTRAINT [PK_SubscriptionPlan] PRIMARY KEY CLUSTERED ([id] ASC)
);

