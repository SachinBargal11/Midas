﻿CREATE TABLE [dbo].[Visits]
(
	[VisitId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[CaseId] bigint ,
	[VisitDate] datetime,
	[VisitStartTime] nvarchar(10),
	[VisitStartTimeType] nvarchar(4),
	[VisitEndTime] nvarchar(10),
	[VisitEndTimeType] nvarchar(4),
	[Notes] nvarchar(1000),
	[AccountId] bigint,
	[PatientId] bigint,
	[DoctorID] bigint ,
	[Status] int,
	[BillStatus] bit,
	[BillDate] datetime,
	[BillNumber] nvarchar(50),
	[VisitTypeId] bigint,
	[ReVisitID] bigint,
	[ReScheduleDate] datetime,
	[StudyNumber] nvarchar(20),
	[Transportation] bit,
	[Finalize] bit,
	[UserID] bigint,
	[PatientSignPath] nvarchar(max),
	[ProviderSignPath] nvarchar(max),
	[PatientSignDate] datetime,
	[ProviderSignDate] datetime,
	[AddedByDcotor] bit,
	[CheckInUserId] bigint,
	[HasProcedureAdded] bit,
	[ManuallyUnFinalized] bit,
	[ClaimNumber] nvarchar(50),
	[PolicyNumber] nvarchar(50),
	[PolicyHolder] nvarchar(100),
	 [PolicyHolderAddressId] bigint,
	[PolicyHolderContactInfoId] bigint,
	[InsuranceId] bigint,
	[InsuranceAddressId] bigint,
	[SpecialtyId] bigint
	CONSTRAINT [FK_Visits_SpecialtyId] FOREIGN KEY ([SpecialtyId]) REFERENCES [Specialty](SpecialtyId),
	CONSTRAINT [FK_Visits_InsuranceId] FOREIGN KEY ([InsuranceId]) REFERENCES [Insurance](InsuranceId),
	CONSTRAINT [FK_Visits_InsuranceAddressId] FOREIGN KEY ([InsuranceAddressId]) REFERENCES [InsuranceAddress](InsuranceAddressId),
	CONSTRAINT [FK_Visits_PH_ContactId] FOREIGN KEY ([PolicyHolderAddressId]) REFERENCES [ContactInfo](ContactInfoId),
	CONSTRAINT [FK_Visits_PH_AddressId] FOREIGN KEY (PolicyHolderContactInfoId) REFERENCES Address(AddressId),
	CONSTRAINT [FK_Visits_CheckInUserId] FOREIGN KEY ([CheckInUserId]) REFERENCES [User](UserId),
	CONSTRAINT [FK_Visits_UserId] FOREIGN KEY ([UserId]) REFERENCES [User](UserId),
	CONSTRAINT [FK_Visits_VisitTypeId] FOREIGN KEY ([VisitTypeId]) REFERENCES [VisitType](VisitTypeId ),
	CONSTRAINT [FK_Visits_DoctorID] FOREIGN KEY ([DoctorID]) REFERENCES [Doctor](DoctorID ),
	CONSTRAINT [FK_Visits_CaseId] FOREIGN KEY ([CaseId]) REFERENCES [Case](CaseId ),
	CONSTRAINT [FK_Visits_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId ),
)
