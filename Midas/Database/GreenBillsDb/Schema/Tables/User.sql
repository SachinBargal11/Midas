CREATE TABLE [dbo].[User1]
(
	[UserId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Name]	NVARCHAR(50) NOT NULL ,
	[FirstName] NVARCHAR(50) NOT NULL ,
	[MiddleName] NVARCHAR(50) NULL ,
	[LastName] NVARCHAR(50) NULL,
	[Gender] Bit, -- 0 Male , 1 Female
	[UserType] tinyint NOT NULL ,
	[SSN] NVARCHAR(50)  NULL ,
	Notes NVARCHAR(4098) NULL ,
	Picture NVARCHAR(512) NULL ,
	AddressId INT NULL,
	ContactInfoId INT NULL, 
    [RoleId] INT NULL, 
    [TypeId] INT NULL, 
    [Password] NVARCHAR(500) NULL, 
    
)
