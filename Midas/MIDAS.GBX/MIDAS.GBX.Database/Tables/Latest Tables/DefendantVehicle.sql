IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'DefendantVehicle'
)
BEGIN
    CREATE TABLE [dbo].[DefendantVehicle]
    (
        [Id] INT NOT NULL IDENTITY(1,1),
            [CaseId] INT NOT NULL,
            [VehicleNumberPlate] NVARCHAR(64) NOT NULL, 
            [State] NVARCHAR(64) NULL, 
            [VehicleMakeModel] NVARCHAR(64) NULL, 
            [VehicleMakeYear] NVARCHAR(32) NULL, 
            [VehicleOwnerName] NVARCHAR(128) NULL, 
            [VehicleOperatorName] NVARCHAR(128) NULL, 
            [VehicleInsuranceCompanyName] NVARCHAR(128) NULL, 
            [VehiclePolicyNumber] NVARCHAR(64) NULL, 
            [VehicleClaimNumber] NVARCHAR(64) NULL,         

            [IsDeleted] [BIT] NULL CONSTRAINT [DF_DefendantVehicle_IsDeleted] DEFAULT 0,
	        [CreateByUserID] [INT] NOT NULL,
	        [CreateDate] [DATETIME2](7) NOT NULL,
	        [UpdateByUserID] [INT] NULL,
	        [UpdateDate] [DATETIME2](7) NULL, 
            CONSTRAINT [PK_DefendantVehicle] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[DefendantVehicle] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'DefendantVehicle'
	AND		CONSTRAINT_NAME = 'FK_DefendantVehicle_Case_CaseId'
)
BEGIN
	ALTER TABLE [dbo].[DefendantVehicle] 
        DROP CONSTRAINT [FK_DefendantVehicle_Case_CaseId]
END
GO

ALTER TABLE [dbo].[DefendantVehicle] ADD CONSTRAINT [FK_DefendantVehicle_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO
