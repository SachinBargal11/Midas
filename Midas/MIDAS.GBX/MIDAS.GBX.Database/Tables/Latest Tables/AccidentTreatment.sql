IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'AccidentTreatment'
)
BEGIN
    CREATE TABLE [dbo].[AccidentTreatment]
    (
        [Id] INT NOT NULL IDENTITY(1,1), 
        [PatientAccidentInfoId] INT NOT NULL, 
        [MedicalFacilityName] NVARCHAR(128) NOT NULL, 
        [DoctorName] NVARCHAR(128) NULL, 
        [ContactNumber] NVARCHAR(64) NOT NULL, 
        [Address] NVARCHAR(256) NULL, 

        [IsDeleted] [BIT] NULL DEFAULT 0,
	    [CreateByUserID] [INT] NOT NULL,
	    [CreateDate] [DATETIME2](7) NOT NULL,
	    [UpdateByUserID] [INT] NULL,
	    [UpdateDate] [DATETIME2](7) NULL, 
        CONSTRAINT [PK_AccidentTreatment] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[AccidentTreatment] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'AccidentTreatment'
	AND		CONSTRAINT_NAME = 'FK_AccidentTreatment_PatientAccidentInfo_PatientAccidentInfoId'
)
BEGIN
	ALTER TABLE [dbo].[AccidentTreatment] DROP CONSTRAINT [FK_AccidentTreatment_PatientAccidentInfo_PatientAccidentInfoId]
END
GO

ALTER TABLE [dbo].[AccidentTreatment] ADD CONSTRAINT [FK_AccidentTreatment_PatientAccidentInfo_PatientAccidentInfoId] FOREIGN KEY([PatientAccidentInfoId])
	REFERENCES [dbo].[PatientAccidentInfo] ([Id])
GO
