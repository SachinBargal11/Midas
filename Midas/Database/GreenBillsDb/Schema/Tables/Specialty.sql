﻿CREATE TABLE [dbo].[Specialty]
(
	[SpecialtyId] int identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(50) not null,
	[IsUnitApply] bit,
	[ParentSpecialtyID] int,
	[FollowUpDays] int,
	[FollowupTime] int,
	[InitialDays] int,
	[InitialTime] int,
	[IsInitialEvaluation] bit,
	[SpecialtyCode] nvarchar(10),
	[Description] nvarchar(20),
	[IsAssociateToPatient] bit,
	[Include1500] bit,
	[IsReferral] BIT,
	[HaveNotes] bit,
	[AssociatedSpecialty] int,
	[MultipleVisitsDay] bit,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
	IPAddress varchar(15),

	
)
