CREATE TABLE [dbo].[ReferPatient]
(
	[Id] INT NOT NULL IDENTITY(1, 1),
	[PatientId] INT NOT NULL, 
    [CaseId] INT NOT NULL, 
	[ByCompanyId] INT NOT NULL, 
    [ByLocationId] INT NOT NULL, 
    [ByDoctorId] INT NOT NULL, 
    [ToCompanyId] INT NOT NULL, 
    [ToLocationId] INT NOT NULL, 
    [ToDoctorId] INT NULL, 
    [ToRoomId] INT NULL, 
    [Note] NVARCHAR(250) NULL, 
    [CurrentTreatmentInfo] NVARCHAR(500) NULL,
    [IsConsentFormSigned] BIT NOT NULL DEFAULT 0, 

	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
    CONSTRAINT [PK_RefferPatient] PRIMARY KEY ([Id])
)
GO

