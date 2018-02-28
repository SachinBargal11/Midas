CREATE TABLE [dbo].[PreferredUIView]
(
    [Id] [TINYINT] NOT NULL IDENTITY, 
    [PreferredUIViewText] NVARCHAR(64) NOT NULL,
    [IsDeleted] [bit] NULL  CONSTRAINT [DF_PreferredUIView_IsDeleted] DEFAULT 0,
    [CreateByUserID] [int] NOT NULL,
    [CreateDate] [datetime2](7) NOT NULL,
    [UpdateByUserID] [int] NULL,
    [UpdateDate] [datetime2](7) NULL, 
    CONSTRAINT [PK_PreferredUIView] PRIMARY KEY ([Id])
)

/*
INSERT INTO [dbo].[PreferredUIView] ([PreferredUIViewText], [IsDeleted], [CreateByUserID], [CreateDate])
	VALUES ('Tab View', 0, 1, GETDATE()), ('Collapsable Panel View', 0, 1, GETDATE())
*/
