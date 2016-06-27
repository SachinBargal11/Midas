CREATE TABLE [dbo].[User1]
(
	[UserId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[UserName] nvarchar(100),
	[Name]	NVARCHAR(50) NOT NULL ,
	[FirstName] NVARCHAR(50) NOT NULL ,
	[MiddleName] NVARCHAR(50) NULL ,
	[LastName] NVARCHAR(50) NULL,
	[Gender] Bit, -- 0 Male , 1 Female
	[UserType] tinyint NOT NULL ,	
	Notes NVARCHAR(4098) NULL ,
	Picture NVARCHAR(512) NULL ,
	AddressId INT NULL,
	ContactInfoId INT NULL, 
	[SSN] nvarchar(50),
	[DateOfBirth] datetime,	
    [RoleId] INT NULL, 
    [TypeId] INT NULL, 
    [Password] NVARCHAR(500) NULL, 
	[EmployerCode] nvarchar(20),
	[DefaultAttoreny] bit,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int
    
)
