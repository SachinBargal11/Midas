CREATE TABLE [dbo].[AccidentTreatment] (
    [Id]                    INT            IDENTITY (1, 1) NOT NULL,
    [PatientAccidentInfoId] INT            NOT NULL,
    [MedicalFacilityName]   NVARCHAR (128) NOT NULL,
    [DoctorName]            NVARCHAR (128) NULL,
    [ContactNumber]         NVARCHAR (64)  NOT NULL,
    [Address]               NVARCHAR (256) NULL,
    [IsDeleted]             BIT            CONSTRAINT [DF_AccidentTreatment_IsDeleted] DEFAULT 0 NULL,
    [CreateByUserID]        INT            NOT NULL,
    [CreateDate]            DATETIME2 (7)  NOT NULL,
    [UpdateByUserID]        INT            NULL,
    [UpdateDate]            DATETIME2 (7)  NULL,
    CONSTRAINT [PK_AccidentTreatment] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_AccidentTreatment_PatientAccidentInfo_PatientAccidentInfoId] FOREIGN KEY ([PatientAccidentInfoId]) REFERENCES [dbo].[PatientAccidentInfo] ([Id])
);

