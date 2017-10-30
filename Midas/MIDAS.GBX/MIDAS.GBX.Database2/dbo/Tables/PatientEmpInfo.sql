CREATE TABLE [dbo].[PatientEmpInfo] (
    [Id]                   INT            IDENTITY (1, 1) NOT NULL,
    [JobTitle]             NVARCHAR (50)  NULL,
    [EmpName]              NVARCHAR (50)  NULL,
    [AddressInfoId]        INT            NOT NULL,
    [ContactInfoId]        INT            NOT NULL,
    [IsDeleted]            BIT            DEFAULT ((0)) NULL,
    [CreateByUserID]       INT            NOT NULL,
    [CreateDate]           DATETIME2 (7)  NOT NULL,
    [UpdateByUserID]       INT            NULL,
    [UpdateDate]           DATETIME2 (7)  NULL,
    [CaseId]               INT            NOT NULL,
    [Salary]               NVARCHAR (32)  NULL,
    [HourOrYearly]         BIT            CONSTRAINT [DF_PatientEmpInfo_PerHourOrYearly] DEFAULT ((0)) NULL,
    [LossOfEarnings]       BIT            CONSTRAINT [DF_PatientEmpInfo_LossOfEarnings] DEFAULT ((0)) NULL,
    [DatesOutOfWork]       NVARCHAR (128) NULL,
    [HoursPerWeek]         NUMERIC (5, 2) NULL,
    [AccidentAtEmployment] BIT            CONSTRAINT [DF_PatientEmpInfo_AccidentAtEmployment] DEFAULT ((0)) NULL,
    CONSTRAINT [PK_PatientEmpInfo] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PatientEmpInfo_AddressInfo_EmpAddressId] FOREIGN KEY ([AddressInfoId]) REFERENCES [dbo].[AddressInfo] ([id]),
    CONSTRAINT [FK_PatientEmpInfo_Case_CaseId] FOREIGN KEY ([CaseId]) REFERENCES [dbo].[Case] ([Id]),
    CONSTRAINT [FK_PatientEmpInfo_ContactInfo_EmpContactInfoId] FOREIGN KEY ([ContactInfoId]) REFERENCES [dbo].[ContactInfo] ([id])
);

