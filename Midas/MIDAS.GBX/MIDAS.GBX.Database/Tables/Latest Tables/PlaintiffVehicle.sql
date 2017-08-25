IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PlaintiffVehicle'
)
BEGIN
    CREATE TABLE [dbo].[PlaintiffVehicle]
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
        [VehicleLocation] NVARCHAR(64) NULL, 
        [VehicleDamageDiscription] NVARCHAR(1024) NULL, 
        [RelativeVehicle] BIT NULL CONSTRAINT [DF_PlaintiffVehicle_RelativeVehicle] DEFAULT 0, 
        [RelativeVehicleMakeModel] NVARCHAR(64) NULL, 
        [RelativeVehicleMakeYear] NVARCHAR(32) NULL, 
        [RelativeVehicleOwnerName] NVARCHAR(128) NULL, 
        [RelativeVehicleInsuranceCompanyName] NVARCHAR(128) NULL, 
        [RelativeVehiclePolicyNumber] NVARCHAR(64) NULL, 
        [VehicleResolveDamage] BIT NULL CONSTRAINT [DF_PlaintiffVehicle_VehicleResolveDamage] DEFAULT 0, 
        [VehicleDriveable] BIT NULL CONSTRAINT [DF_PlaintiffVehicle_VehicleDriveable] DEFAULT 0, 
        [VehicleEstimatedDamage] DECIMAL NULL CONSTRAINT [DF_PlaintiffVehicle_VehicleEstimatedDamage] DEFAULT 0, 
        [RelativeVehicleLocation] NVARCHAR(64) NULL, 
        [VehicleClientHaveTitle] BIT NULL CONSTRAINT [DF_PlaintiffVehicle_VehicleClientHaveTitle] DEFAULT 0, 
        [RelativeVehicleOwner] NVARCHAR(128) NULL, 

        [IsDeleted] [BIT] NULL CONSTRAINT [DF_PlaintiffVehicle_IsDeleted] DEFAULT 0,
	    [CreateByUserID] [INT] NOT NULL,
	    [CreateDate] [DATETIME2](7) NOT NULL,
	    [UpdateByUserID] [INT] NULL,
	    [UpdateDate] [DATETIME2](7) NULL, 
        CONSTRAINT [PK_PlaintiffVehicle] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[PlaintiffVehicle] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PlaintiffVehicle'
	AND		CONSTRAINT_NAME = 'FK_PlaintiffVehicle_Case_CaseId'
)
BEGIN
	ALTER TABLE [dbo].[PlaintiffVehicle] 
        DROP CONSTRAINT [FK_PlaintiffVehicle_Case_CaseId]
END
GO

ALTER TABLE [dbo].[PlaintiffVehicle] ADD CONSTRAINT [FK_PlaintiffVehicle_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO
