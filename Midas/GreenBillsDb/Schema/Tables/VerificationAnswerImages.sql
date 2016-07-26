CREATE TABLE [dbo].[VerificationAnswerImages]
(
	[AnswerImagesId] int identity(1,1) NOT NULL PRIMARY KEY,
	[BillId] nvarchar(50),
	[AccountId]int,
	[ImageId] int,	
	[VerificationId] int,
	[VerificationAnswerId] int,
	[AnswerImagePath] nvarchar(max),
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
	IPAddress varchar(15)
)
