CREATE TABLE [dbo].[Specialty]
(
	[SpecialtyId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(50) not null,
	[IsUnitApply] bit,
	[Order] int,
	[IsInOrder] int,
	[ParentSpecialtyID] bigint,
	[Isdisplay] bit,
	[FollowUpDays] int,
	[FollowupTime] int,
	[InitialDays] int,
	[InitialTime] int,
	[IsInitialEvaluation] bit,
	[SpecialtyCode] nvarchar(10),
	[Description] nvarchar(20),
	[IsAssociateToPatient] bit,
	[Include1500] bit,
	[IsReferral] int,
	[HaveNots] bit,
	[AssociatedSpecialty] bigint,
	[AccountId] bigint not null,
	CONSTRAINT [FK_Specialty_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId)
)
