CREATE TABLE [dbo].[DoctorSpeciality]
(
	[DoctorSpecialityID] INT NOT NULL PRIMARY KEY, 
    [ProviderMedicalOfifceID] int,
	SpecialityID INT,
	CreateDate DateTime,
	UpdateDate DateTime,
	CreateByUserID INT,
	UpdateByUserID INT
)
