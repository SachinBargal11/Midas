CREATE TABLE [dbo].[User]
(
	[UserId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[UserName] nvarchar(100),
	[FirstName] NVARCHAR(50) NOT NULL ,
	[MiddleName] NVARCHAR(50) NULL ,
	[LastName] NVARCHAR(50) NULL,
    [SSN]  NVARCHAR(50) NULL,
	[Gender] Bit, -- 0 Male , 1 Female
	[UserType] tinyint NOT NULL ,	
	Notes NVARCHAR(4098) NULL ,
	Picture NVARCHAR(512) NULL ,
	AddressId INT NULL,
	ContactInfoId INT NULL, 	
	[DateOfBirth] datetime,
    [RoleId] INT NULL, 
    [Password] NVARCHAR(500) NULL, 
	[EmployerCode] nvarchar(20),
	[DefaultAttoreny] bit,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int
    
)
