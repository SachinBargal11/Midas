CREATE TABLE [dbo].[Insurance]
(
	[InsuranceId] int identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(250),
	[Code] nvarchar(20),
	[ContactPerson] nvarchar(20),
	[ContactInfoId] int,
	[Priority_Billing] bit,
	[Paper_Authorization] bit,
	[Generate1500Forms] bit,
	[AccountId] int,
	[OfficeId]int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
	IPAddress varchar(15)
	 
)
