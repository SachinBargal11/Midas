CREATE TABLE [dbo].[Nodes]
(
	[NodeId] int identity(1,1) NOT NULL PRIMARY KEY,
	[ParentId] int,
	[NodeName] nvarchar(50),
	[ParentName] nvarchar(50),
	[IsDeleted] bit,
	[AllowToDeleteDocument] bit,
	[AccountId] int not null,    
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int   
	CONSTRAINT [FK_Nodes_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](ID)
)
