CREATE TABLE [Messaging].[EMailConfiguration]
(
    [Id] INT NOT NULL IDENTITY,
    [AppId] INT NOT NULL, 
    [QueueTypeId] INT NOT NULL, 
    [SmtpClient] NVARCHAR(150) NOT NULL,
    [SmtpClient_Port] NVARCHAR(10) NOT NULL, 
    [NetworkCredential_EMail] NVARCHAR(150) NOT NULL, 
    [NetworkCredential_Pwd] NVARCHAR(150) NOT NULL, 
    [IsDeleted] BIT NOT NULL DEFAULT 0,
    CONSTRAINT [PK_EMailConfiguration] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [Messaging].[EMailConfiguration]  WITH CHECK ADD  CONSTRAINT [FK_EMailConfiguration_AppMessageQueue_AppId] FOREIGN KEY([AppId])
	REFERENCES [Messaging].[AppMessageQueue] ([AppId])
GO

ALTER TABLE [Messaging].[EMailConfiguration] CHECK CONSTRAINT [FK_EMailConfiguration_AppMessageQueue_AppId]
GO

ALTER TABLE [Messaging].[EMailConfiguration]  WITH CHECK ADD  CONSTRAINT [FK_EMailConfiguration_QueueType_QueueTypeId] FOREIGN KEY([QueueTypeId])
	REFERENCES [Messaging].[QueueType] ([Id])
GO

ALTER TABLE [Messaging].[EMailConfiguration] CHECK CONSTRAINT [FK_EMailConfiguration_QueueType_QueueTypeId]
GO

/*
INSERT INTO [Messaging].[EMailConfiguration] ([AppId], [QueueTypeId], [SmtpClient], [SmtpClient_Port], [NetworkCredential_EMail], [NetworkCredential_Pwd]) 
    VALUES (1, 1, 'smtp.zoho.com', '587', 'support@codearray.tech', 'supp0rt@2017')
*/
