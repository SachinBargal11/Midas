IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
)
BEGIN
    CREATE TABLE [dbo].[PatientAccidentInfo]
    (
	    [Id] [INT] NOT NULL IDENTITY(1,1), 
	    [CaseId] [INT] NOT NULL,
	    [AccidentDate] DATETIME NOT NULL, 
        [Weather] NVARCHAR(128) NULL, 
	    [PlateNumber] [NVARCHAR](64) NULL,
	    [AccidentAddressInfoId] [INT] NOT NULL, 
        [PoliceAtScene] BIT NULL CONSTRAINT [DF_PatientAccidentInfo_PoliceAtScene] DEFAULT 0, 
        [Precinct] NVARCHAR(64) NULL, 
        [ReportNumber] [NVARCHAR](128) NULL, 
	    [PatientTypeId] [TINYINT] NOT NULL,
        [WearingSeatBelts] BIT NULL CONSTRAINT [DF_PatientAccidentInfo_WearingSeatBelts] DEFAULT 0, 
        [AirBagsDeploy] BIT NULL CONSTRAINT [DF_PatientAccidentInfo_AirBagsDeploy] DEFAULT 0,  
        [PhotosTaken] BIT NULL CONSTRAINT [DF_PatientAccidentInfo_PhotosTaken] DEFAULT 0, 
        [AccidentDescription] NVARCHAR(1024) NULL, 
        [Witness] BIT NULL CONSTRAINT [DF_PatientAccidentInfo_Witness] DEFAULT 0, 
        [DescribeInjury] [NVARCHAR](1024) NULL, 
	    [HospitalName] [NVARCHAR](128) NULL, 
        [Ambulance] BIT NULL CONSTRAINT [DF_PatientAccidentInfo_Ambulance] DEFAULT 0, 
	    [HospitalAddressInfoId] [INT] NOT NULL, 
        [TreatedAndReleased] BIT NULL CONSTRAINT [DF_PatientAccidentInfo_TreatedAndReleased] DEFAULT 0, 
        [Admitted] BIT NULL CONSTRAINT [DF_PatientAccidentInfo_Admitted] DEFAULT 0, 
	    [DateOfAdmission] DATETIME NULL, 
        [XRaysTaken] BIT NULL CONSTRAINT [DF_PatientAccidentInfo_XRaysTaken] DEFAULT 0, 
        [DurationAtHospital] NVARCHAR(128) NULL, 
        [MedicalReportNumber] [NVARCHAR](128) NULL,
	    [AdditionalPatients] [NVARCHAR](512) NULL,     

        [IsDeleted] [BIT] NULL DEFAULT 0,
	    [CreateByUserID] [INT] NOT NULL,
	    [CreateDate] [DATETIME2](7) NOT NULL,
	    [UpdateByUserID] [INT] NULL,
	    [UpdateDate] [DATETIME2](7) NULL, 
        CONSTRAINT [PK_AccidentInfo] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[PatientAccidentInfo] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		CONSTRAINT_NAME = 'FK_PatientAccidentInfo_Case_CaseId'
)
BEGIN
	ALTER TABLE [dbo].[PatientAccidentInfo] 
        DROP CONSTRAINT [FK_PatientAccidentInfo_Case_CaseId]
END
GO

ALTER TABLE [dbo].[PatientAccidentInfo] ADD CONSTRAINT [FK_PatientAccidentInfo_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		CONSTRAINT_NAME = 'FK_PatientAccidentInfo_AddressInfo_AccidentAddressInfoId'
)
BEGIN
	ALTER TABLE [dbo].[PatientAccidentInfo] 
        DROP CONSTRAINT [FK_PatientAccidentInfo_AddressInfo_AccidentAddressInfoId]
END
GO

ALTER TABLE [dbo].[PatientAccidentInfo] ADD CONSTRAINT [FK_PatientAccidentInfo_AddressInfo_AccidentAddressInfoId] FOREIGN KEY([AccidentAddressInfoId])
	REFERENCES [dbo].[AddressInfo] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		CONSTRAINT_NAME = 'FK_PatientAccidentInfo_PatientType_PatientTypeId'
)
BEGIN
	ALTER TABLE [dbo].[PatientAccidentInfo] 
        DROP CONSTRAINT [FK_PatientAccidentInfo_PatientType_PatientTypeId]
END
GO

ALTER TABLE [dbo].[PatientAccidentInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientAccidentInfo_PatientType_PatientTypeId] FOREIGN KEY([PatientTypeId])
	REFERENCES [dbo].[PatientType] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		CONSTRAINT_NAME = 'FK_PatientAccidentInfo_AddressInfo_HospitalAddressInfoId'
)
BEGIN
	ALTER TABLE [dbo].[PatientAccidentInfo] 
        DROP CONSTRAINT [FK_PatientAccidentInfo_AddressInfo_HospitalAddressInfoId]
END
GO

ALTER TABLE [dbo].[PatientAccidentInfo] ADD CONSTRAINT [FK_PatientAccidentInfo_AddressInfo_HospitalAddressInfoId] FOREIGN KEY([HospitalAddressInfoId])
	REFERENCES [dbo].[AddressInfo] ([Id])
GO
------------------------------------------------------------

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		COLUMN_NAME = 'AccidentDate'
)
BEGIN
	ALTER TABLE [dbo].[PatientAccidentInfo] ALTER COLUMN [AccidentDate] DATETIME NOT NULL
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		COLUMN_NAME = 'Weather'
)
BEGIN
	PRINT 'Table [dbo].[PatientAccidentInfo] already have a Column [Weather] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientAccidentInfo] ADD [Weather] NVARCHAR(128) NULL
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		COLUMN_NAME = 'PlateNumber'
)
BEGIN
	ALTER TABLE [dbo].[PatientAccidentInfo] ALTER COLUMN [PlateNumber] [NVARCHAR](64) NULL
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		COLUMN_NAME = 'PoliceAtScene'
)
BEGIN
	PRINT 'Table [dbo].[PatientAccidentInfo] already have a Column [PoliceAtScene] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientAccidentInfo] ADD [PoliceAtScene] BIT NULL CONSTRAINT [DF_PatientAccidentInfo_PoliceAtScene] DEFAULT 0
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		COLUMN_NAME = 'Precinct'
)
BEGIN
	PRINT 'Table [dbo].[PatientAccidentInfo] already have a Column [Precinct] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientAccidentInfo] ADD [Precinct] NVARCHAR(64) NULL
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		COLUMN_NAME = 'ReportNumber'
)
BEGIN
	ALTER TABLE [dbo].[PatientAccidentInfo] ALTER COLUMN [ReportNumber] [NVARCHAR](128) NULL
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		COLUMN_NAME = 'WearingSeatBelts'
)
BEGIN
	PRINT 'Table [dbo].[PatientAccidentInfo] already have a Column [WearingSeatBelts] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientAccidentInfo] ADD [WearingSeatBelts] BIT NULL CONSTRAINT [DF_PatientAccidentInfo_WearingSeatBelts] DEFAULT 0
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		COLUMN_NAME = 'AirBagsDeploy'
)
BEGIN
	PRINT 'Table [dbo].[PatientAccidentInfo] already have a Column [AirBagsDeploy] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientAccidentInfo] ADD [AirBagsDeploy] BIT NULL CONSTRAINT [DF_PatientAccidentInfo_AirBagsDeploy] DEFAULT 0
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		COLUMN_NAME = 'PhotosTaken'
)
BEGIN
	PRINT 'Table [dbo].[PatientAccidentInfo] already have a Column [PhotosTaken] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientAccidentInfo] ADD [PhotosTaken] BIT NULL CONSTRAINT [DF_PatientAccidentInfo_PhotosTaken] DEFAULT 0
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		COLUMN_NAME = 'AccidentDescription'
)
BEGIN
	PRINT 'Table [dbo].[PatientAccidentInfo] already have a Column [AccidentDescription] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientAccidentInfo] ADD [AccidentDescription] NVARCHAR(1024) NULL
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		COLUMN_NAME = 'Witness'
)
BEGIN
	PRINT 'Table [dbo].[PatientAccidentInfo] already have a Column [Witness] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientAccidentInfo] ADD [Witness] BIT NULL CONSTRAINT [DF_PatientAccidentInfo_Witness] DEFAULT 0
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		COLUMN_NAME = 'DescribeInjury'
)
BEGIN
	ALTER TABLE [dbo].[PatientAccidentInfo] ALTER COLUMN [DescribeInjury] [NVARCHAR](1024) NULL
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		COLUMN_NAME = 'HospitalName'
)
BEGIN
	ALTER TABLE [dbo].[PatientAccidentInfo] ALTER COLUMN [HospitalName] [NVARCHAR](128) NULL
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		COLUMN_NAME = 'Ambulance'
)
BEGIN
	PRINT 'Table [dbo].[PatientAccidentInfo] already have a Column [Ambulance] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientAccidentInfo] ADD [Ambulance] BIT NULL CONSTRAINT [DF_PatientAccidentInfo_Ambulance] DEFAULT 0
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		COLUMN_NAME = 'TreatedAndReleased'
)
BEGIN
	PRINT 'Table [dbo].[PatientAccidentInfo] already have a Column [TreatedAndReleased] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientAccidentInfo] ADD [TreatedAndReleased] BIT NULL CONSTRAINT [DF_PatientAccidentInfo_TreatedAndReleased] DEFAULT 0
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		COLUMN_NAME = 'Admitted'
)
BEGIN
	PRINT 'Table [dbo].[PatientAccidentInfo] already have a Column [Admitted] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientAccidentInfo] ADD [Admitted] BIT NULL CONSTRAINT [DF_PatientAccidentInfo_Admitted] DEFAULT 0
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		COLUMN_NAME = 'DateOfAdmission'
)
BEGIN
	ALTER TABLE [dbo].[PatientAccidentInfo] ALTER COLUMN [DateOfAdmission] DATETIME NULL
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		COLUMN_NAME = 'XRaysTaken'
)
BEGIN
	PRINT 'Table [dbo].[PatientAccidentInfo] already have a Column [XRaysTaken] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientAccidentInfo] ADD [XRaysTaken] BIT NULL CONSTRAINT [DF_PatientAccidentInfo_XRaysTaken] DEFAULT 0
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		COLUMN_NAME = 'DurationAtHospital'
)
BEGIN
	PRINT 'Table [dbo].[PatientAccidentInfo] already have a Column [DurationAtHospital] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientAccidentInfo] ADD [DurationAtHospital] NVARCHAR(128) NULL
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		COLUMN_NAME = 'DateOfAdmission'
)
BEGIN
	ALTER TABLE [dbo].[PatientAccidentInfo] ALTER COLUMN [MedicalReportNumber] [NVARCHAR](128) NULL
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientAccidentInfo'
	AND		COLUMN_NAME = 'DateOfAdmission'
)
BEGIN
	ALTER TABLE [dbo].[PatientAccidentInfo] ALTER COLUMN [AdditionalPatients] [NVARCHAR](512) NULL
END
GO
