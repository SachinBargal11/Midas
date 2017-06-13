CREATE TABLE [Messaging].[SMSConfiguration]
(
    [Id] INT NOT NULL IDENTITY,
    [AppId] INT NOT NULL, 
    [QueueTypeId] INT NOT NULL, 
    [AccountSid] NVARCHAR(150) NOT NULL, 
    [AuthToken] NVARCHAR(150) NOT NULL, 
    [IsDeleted] BIT NOT NULL DEFAULT 0,
    CONSTRAINT [PK_SMSConfiguration] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [Messaging].[SMSConfiguration]  WITH CHECK ADD  CONSTRAINT [FK_SMSConfiguration_AppMessageQueue_AppId] FOREIGN KEY([AppId])
	REFERENCES [Messaging].[AppMessageQueue] ([AppId])
GO

ALTER TABLE [Messaging].[SMSConfiguration] CHECK CONSTRAINT [FK_SMSConfiguration_AppMessageQueue_AppId]
GO

ALTER TABLE [Messaging].[SMSConfiguration]  WITH CHECK ADD  CONSTRAINT [FK_SMSConfiguration_QueueType_QueueTypeId] FOREIGN KEY([QueueTypeId])
	REFERENCES [Messaging].[QueueType] ([Id])
GO

ALTER TABLE [Messaging].[SMSConfiguration] CHECK CONSTRAINT [FK_SMSConfiguration_QueueType_QueueTypeId]
GO

/*
INSERT INTO [Messaging].[SMSConfiguration] ([AppId], [QueueTypeId], [AccountSid], [AuthToken]) VALUES (1, 1, 'AC48ba9355b0bae1234caa9e29dc73b407', '74b9f9f1c60c200d28b8c5b22968e65f')
*/
