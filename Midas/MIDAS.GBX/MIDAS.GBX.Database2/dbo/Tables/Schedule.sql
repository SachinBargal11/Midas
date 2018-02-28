CREATE TABLE [dbo].[Schedule] (
    [id]             INT           IDENTITY (1, 1) NOT NULL,
    [Name]           NVARCHAR (50) NOT NULL,
    [IsDeleted]      BIT           CONSTRAINT [DF_Schedule_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID] INT           NOT NULL,
    [CreateDate]     DATETIME2 (7) NOT NULL,
    [UpdateByUserID] INT           NULL,
    [IsDefault]      BIT           NOT NULL,
    [UpdateDate]     DATETIME2 (7) NULL,
    [CompanyId]      INT           NULL,
    CONSTRAINT [PK_Schedule] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_Schedule_Company_CompanyId] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([id])
);

