CREATE TABLE [dbo].[PatientAccidentDetails]
(
	[PatientAccidentDetailsId] int identity(1,1) NOT NULL PRIMARY KEY,
	PatientDetailId int,
	[AccountId] int,
	[PlateNo] nvarchar(25),
	[AccidentDate] datetime,
	[AddressId] int,
	[ReportNo] nvarchar(25),
	[PatientFromCar] nvarchar(25),
	[HospitalName] nvarchar(50),
	[HospitalAddressId] int,
	[DescripInjury] nvarchar(max),
	[AdmisionDate] datetime,
	[PatientType] nvarchar(50),
	
)
