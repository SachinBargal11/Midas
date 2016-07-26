CREATE TABLE [dbo].[VerificationImages]
(
	[VerificationImagesId] bigint NOT NULL PRIMARY KEY,
	[BillId] nvarchar(50),
	[AccountId]bigint,
	[ImageId] bigint,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
	IPAddress varchar(15)
)
