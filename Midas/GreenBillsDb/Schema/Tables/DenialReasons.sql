CREATE TABLE [dbo].[DenialReasons]
(
	[DenialReasonsId] INT identity(1,1)  NOT NULL PRIMARY KEY,
	[DenialReasons] nvarchar(50),
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
    IPAddress varchar(15) 
)
