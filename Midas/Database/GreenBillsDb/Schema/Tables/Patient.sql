CREATE TABLE [dbo].[PatientDetails]
(
	[PatientDetailId] int identity(1,1) NOT NULL PRIMARY KEY,
	[UserPatientId] int,
	[FirstName] nvarchar(50),	
	[Age] int,
	[WCBNO] nvarchar(50),	
	[JobTitle] nvarchar(50),
	[WorkActivitis] nvarchar(50),
	[CarrierCaseNo] nvarchar(50),
	[EmployerName] nvarchar(100),
	[EmployerAddressId] int,
	[EmployerContactInfoId] int,
	[UseTranspotation]bit,
	[AccountNo] nvarchar(50),
	[ChartNo] nvarchar(50),
	[PolicyHolder] nvarchar(150),
	[FirstTreatmentDate] datetime,
	[UserId] int,
	[IPAddress] nvarchar(25),
	[SourceProcess] nvarchar(50),
    [PolicyHolderAddressId] int,
	[PolicyHolderContactInfoId] int,
	[InsuranceId] int,
	[InsuranceAddressId] int,
	[AccountId] int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int
	


)
