IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'AccidentWitness'
)
BEGIN
    CREATE TABLE [dbo].[AccidentWitness]
    (
        [Id] INT NOT NULL IDENTITY(1,1), 
        [PatientAccidentInfoId] INT NOT NULL, 
        [WitnessName] NVARCHAR(128) NOT NULL, 
        [WitnessContactNumber] NVARCHAR(64) NOT NULL, 

        [IsDeleted] [BIT] NULL DEFAULT 0,
	    [CreateByUserID] [INT] NOT NULL,
	    [CreateDate] [DATETIME2](7) NOT NULL,
	    [UpdateByUserID] [INT] NULL,
	    [UpdateDate] [DATETIME2](7) NULL, 
        CONSTRAINT [PK_AccidentWitness] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[AccidentWitness] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'AccidentWitness'
	AND		CONSTRAINT_NAME = 'FK_AccidentWitness_PatientAccidentInfo_PatientAccidentInfoId'
)
BEGIN
	ALTER TABLE [dbo].[AccidentWitness] DROP CONSTRAINT [FK_AccidentWitness_PatientAccidentInfo_PatientAccidentInfoId]
END
GO

ALTER TABLE [dbo].[AccidentWitness] ADD CONSTRAINT [FK_AccidentWitness_PatientAccidentInfo_PatientAccidentInfoId] FOREIGN KEY([PatientAccidentInfoId])
	REFERENCES [dbo].[PatientAccidentInfo] ([Id])
GO
