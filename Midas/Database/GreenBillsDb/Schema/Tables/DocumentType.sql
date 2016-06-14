CREATE TABLE [dbo].[DocumentType]
(
	[DocumentTypeId] INT NOT NULL PRIMARY KEY, 
    [Type] NVARCHAR(100) NULL,
	[AbbreviationId] bigint ,
	[CreatedBy] bigint,
	[UpdatedBy] bigint,
	[NodeId] bigint,
	[Order] int,
	[MergeInPacket] bit,
	[AssignUserID] bigint,
	[AccountID] bigint,
	CONSTRAINT [FK_DocumentType_NodeId] FOREIGN KEY ([NodeId]) REFERENCES [Nodes](NodeId),
	CONSTRAINT [FK_DocumentType_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId),
	CONSTRAINT [FK_DocumentType_CreatedBy] FOREIGN KEY ([CreatedBy]) REFERENCES [User](UserId),
	CONSTRAINT [FK_DocumentType_UpdatedBy] FOREIGN KEY ([UpdatedBy]) REFERENCES [User](UserId),
	CONSTRAINT [FK_DocumentType_AbbreviationId] FOREIGN KEY ([AbbreviationId]) REFERENCES [Abbreviation](AbbreviationId),
)
