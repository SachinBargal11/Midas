CREATE TABLE [dbo].[Nodes]
(
	[NodeId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[ParentId] bigint,
	[NodeName] nvarchar(50),
	[ParentName] nvarchar(50),
	[IsDeleted] bit,
	[AllowToDeleteDocument] bit,
	[AccountId] bigint not null,
       
	CONSTRAINT [FK_Nodes_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId)
)
