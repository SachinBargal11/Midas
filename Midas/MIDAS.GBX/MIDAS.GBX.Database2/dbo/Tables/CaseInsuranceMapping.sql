CREATE TABLE [dbo].[CaseInsuranceMapping] (
    [Id]                     INT           IDENTITY (1, 1) NOT NULL,
    [CaseId]                 INT           NOT NULL,
    [PatientInsuranceInfoId] INT           NOT NULL,
    [AdjusterMasterId]       INT           NULL,
    [IsDeleted]              BIT           CONSTRAINT [DF_CaseInsuranceMapping_IsDeleted] DEFAULT 0NULL,
    [CreateByUserID]         INT           NOT NULL,
    [CreateDate]             DATETIME2 (7) NOT NULL,
    [UpdateByUserID]         INT           NULL,
    [UpdateDate]             DATETIME2 (7) NULL,
    CONSTRAINT [PK_CaseInsuranceMapping] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_CaseInsuranceMapping_AdjusterMaster_AdjusterMasterId] FOREIGN KEY ([AdjusterMasterId]) REFERENCES [dbo].[AdjusterMaster] ([Id]),
    CONSTRAINT [FK_CaseInsuranceMapping_Case_CaseId] FOREIGN KEY ([CaseId]) REFERENCES [dbo].[Case] ([Id]),
    CONSTRAINT [FK_CaseInsuranceMapping_PatientInsuranceInfo_PatientInsuranceInfoId] FOREIGN KEY ([PatientInsuranceInfoId]) REFERENCES [dbo].[PatientInsuranceInfo] ([Id])
);

