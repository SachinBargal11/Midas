CREATE TABLE [dbo].[PatientPriorAccidentInjury] (
    [Id]                              INT             IDENTITY (1, 1) NOT NULL,
    [CaseId]                          INT             NOT NULL,
    [AccidentBefore]                  BIT             CONSTRAINT [DF_PatientPriorAccidentInjury_AccidentBefore] DEFAULT ((0)) NULL,
    [AccidentBeforeExplain]           NVARCHAR (1024) NULL,
    [LawsuitWorkerCompBefore]         BIT             CONSTRAINT [DF_PatientPriorAccidentInjury_LawsuitWorkerCompBefore] DEFAULT ((0)) NULL,
    [LawsuitWorkerCompBeforeExplain]  NVARCHAR (1024) NULL,
    [PhysicalComplaintsBefore]        BIT             CONSTRAINT [DF_PatientPriorAccidentInjury_PhysicalComplaintsBefore] DEFAULT ((0)) NULL,
    [PhysicalComplaintsBeforeExplain] NVARCHAR (1024) NULL,
    [OtherInformation]                NVARCHAR (1024) NULL,
    [IsDeleted]                       BIT             CONSTRAINT [DF_PatientPriorAccidentInjury_[IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID]                  INT             NOT NULL,
    [CreateDate]                      DATETIME2 (7)   NOT NULL,
    [UpdateByUserID]                  INT             NULL,
    [UpdateDate]                      DATETIME2 (7)   NULL,
    CONSTRAINT [PK_PatientPriorAccidentInjury] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PatientPriorAccidentInjury_Case_CaseId] FOREIGN KEY ([CaseId]) REFERENCES [dbo].[Case] ([Id])
);

