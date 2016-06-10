CREATE TABLE [dbo].[User]
(
	[UserId] bigint identity(1,1) NOT NULL PRIMARY KEY ,
	[UserName] nvarchar(50),
	[Password] nvarchar(250),
	[ProviderId] bigint,
	[ContactInfoId] bigint,
	[AccountId] bigint,
	[DefaultUrl] nvarchar(250),
	[CreatedDate] datetime,
	[LastLogin] Datetime,
	[IPEnabled] bit,
	[ForceToChangePassword] bit,
	[NextPasswordExpiry] datetime,
	[ReferringOfficeID]  bigint,
	[DiagnosisPage] bit,
	[IsProvider] bit,
	[ValidandShow] bit,
	[DomainName] nvarchar(100),
	[Disable] bit,
	[CreatedBy] bigint,
	[RoleId] bigint 
	CONSTRAINT [FK_User_ContactId] FOREIGN KEY ([ContactInfoId]) REFERENCES [ContactInfo](ContactInfoId),
	CONSTRAINT [FK_User_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Role](RoleId ),
	CONSTRAINT [FK_User_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId),
	CONSTRAINT [FK_User_ProviderId] FOREIGN KEY ([ProviderId]) REFERENCES [Provider](ProviderId),
	CONSTRAINT [FK_User_ReferringOfficeID] FOREIGN KEY ([ReferringOfficeID])  REFERENCES [Provider](ProviderId)
)
