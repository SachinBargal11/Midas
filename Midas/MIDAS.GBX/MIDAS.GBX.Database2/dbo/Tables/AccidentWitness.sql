CREATE TABLE [dbo].[AccidentWitness] (
    [Id]                    INT            IDENTITY (1, 1) NOT NULL,
    [PatientAccidentInfoId] INT            NOT NULL,
    [WitnessName]           NVARCHAR (128) NOT NULL,
    [WitnessContactNumber]  NVARCHAR (64)  NOT NULL,
    [IsDeleted]             BIT            CONSTRAINT [DF_AccidentWitness_IsDeleted] DEFAULT 0 NULL,
    [CreateByUserID]        INT            NOT NULL,
    [CreateDate]            DATETIME2 (7)  NOT NULL,
    [UpdateByUserID]        INT            NULL,
    [UpdateDate]            DATETIME2 (7)  NULL,
    CONSTRAINT [PK_AccidentWitness] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_AccidentWitness_PatientAccidentInfo_PatientAccidentInfoId] FOREIGN KEY ([PatientAccidentInfoId]) REFERENCES [dbo].[PatientAccidentInfo] ([Id])
);

