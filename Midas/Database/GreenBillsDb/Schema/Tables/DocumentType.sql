CREATE TABLE [dbo].[DocumentType]
(
	[DocumentTypeId] int NOT NULL PRIMARY KEY, 
    [Type] NVARCHAR(100) NULL,
	[AbbreviationId] int ,	
	[NodeId] int,
	[Order] int,
	[MergeInPacket] bit,
	[AssignUserID] int,
	[AccountID] int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
	IPAddress varchar(15)
)
