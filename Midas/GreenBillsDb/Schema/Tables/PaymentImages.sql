CREATE TABLE [dbo].[PaymentImages]
(
	[PaymentImageId] int identity(1,1) NOT NULL PRIMARY KEY,
	[ImageId] int,
	[Path] nvarchar(max),
	[FileName] nvarchar(1000),
	[AccountId]int ,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
	IPAddress varchar(15)
	
)

