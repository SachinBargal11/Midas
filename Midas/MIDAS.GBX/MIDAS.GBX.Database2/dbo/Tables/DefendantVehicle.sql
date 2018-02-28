CREATE TABLE [dbo].[DefendantVehicle] (
    [Id]                          INT            IDENTITY (1, 1) NOT NULL,
    [CaseId]                      INT            NOT NULL,
    [VehicleNumberPlate]          NVARCHAR (64)  NOT NULL,
    [State]                       NVARCHAR (64)  NULL,
    [VehicleMakeModel]            NVARCHAR (64)  NULL,
    [VehicleMakeYear]             NVARCHAR (32)  NULL,
    [VehicleOwnerName]            NVARCHAR (128) NULL,
    [VehicleOperatorName]         NVARCHAR (128) NULL,
    [VehicleInsuranceCompanyName] NVARCHAR (128) NULL,
    [VehiclePolicyNumber]         NVARCHAR (64)  NULL,
    [VehicleClaimNumber]          NVARCHAR (64)  NULL,
    [IsDeleted]                   BIT            CONSTRAINT [DF_DefendantVehicle_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID]              INT            NOT NULL,
    [CreateDate]                  DATETIME2 (7)  NOT NULL,
    [UpdateByUserID]              INT            NULL,
    [UpdateDate]                  DATETIME2 (7)  NULL,
    CONSTRAINT [PK_DefendantVehicle] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_DefendantVehicle_Case_CaseId] FOREIGN KEY ([CaseId]) REFERENCES [dbo].[Case] ([Id])
);

