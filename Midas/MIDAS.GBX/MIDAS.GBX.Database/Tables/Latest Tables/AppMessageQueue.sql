CREATE TABLE [Messaging].[AppMessageQueue]
(
    [Id] INT NOT NULL IDENTITY,
    [AppId] INT NOT NULL, 
    [AppName] NVARCHAR(150) NOT NULL, 
    [QueueTypeId] INT NOT NULL, 
    CONSTRAINT [PK_AppMessageQueue] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [Messaging].[AppMessageQueue] ADD CONSTRAINT UK_AppMessageQueue_AppId UNIQUE ([AppId])
GO

ALTER TABLE [Messaging].[AppMessageQueue]  WITH CHECK ADD  CONSTRAINT [FK_AppMessageQueue_QueueType_QueueTypeId] FOREIGN KEY([QueueTypeId])
	REFERENCES [Messaging].[QueueType] ([Id])
GO

ALTER TABLE [Messaging].[AppMessageQueue] CHECK CONSTRAINT [FK_AppMessageQueue_QueueType_QueueTypeId]
GO

/*
INSERT INTO [Messaging].[AppMessageQueue] ([AppId], [AppName], [QueueTypeId]) VALUES (1, 'MIDAS', 1)
*/
