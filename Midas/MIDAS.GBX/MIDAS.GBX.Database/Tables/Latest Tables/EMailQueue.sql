CREATE TABLE [Messaging].[EMailQueue]
(
    [Id] INT NOT NULL IDENTITY,
    [AppId] INT NOT NULL,
    [FromEmail] NVARCHAR(50) NOT NULL, 
    [ToEmail] NVARCHAR(500) NOT NULL,
    [CcEmail] NVARCHAR(500) NULL,
    [BccEmail] NVARCHAR(500) NULL,
    [EMailSubject] NVARCHAR(500) NOT NULL, 
    [EMailBody] NVARCHAR(4000) NOT NULL, 
    [CreatedDate] DATETIME2 NOT NULL, 
    [DeliveryDate] DATETIME2 NULL, 
    [NumberOfAttempts] INT NOT NULL DEFAULT 0, 
    [ResultObject] NVARCHAR(4000) NULL,
    CONSTRAINT [PK_EMailQueue] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [Messaging].[EMailQueue]  WITH CHECK ADD  CONSTRAINT [FK_EMailQueue_AppMessageQueue_AppId] FOREIGN KEY([AppId])
	REFERENCES [Messaging].[AppMessageQueue] ([AppId])
GO

ALTER TABLE [Messaging].[EMailQueue] CHECK CONSTRAINT [FK_EMailQueue_AppMessageQueue_AppId]
GO
