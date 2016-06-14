CREATE TABLE [dbo].[ProcedureCode]
(
	[ProcedureCodeId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[code] nvarchar(20),
	[Description] nvarchar(250),
	[Amount] money,
	[IsBilable] bit,
	[ShowToDoctor] bit,
	[IsAddedToPreferredList] bit,
	[LongDescription] nvarchar(1000),
	[Modifier] nvarchar(20),
	[RVU] nvarchar(200),
	[ValueCode] nvarchar(200),
	[LongModifier] nvarchar(100),
	[LocationId] bigint,
	[SpecialtyId] bigint,
	[RoomId] bigint,
	[AccountId] bigint
	CONSTRAINT [FK_ProcedureCode_SpecialtyId] FOREIGN KEY (SpecialtyId) REFERENCES [Specialty](SpecialtyId), 
    CONSTRAINT [FK_ProcedureCode_Room] FOREIGN KEY ([RoomId]) REFERENCES [Room](RoomId),
	CONSTRAINT [FK_ProcedureCode_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId)

)
