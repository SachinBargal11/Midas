CREATE TABLE [dbo].[PatientVisitEvent]
(
	[Id] [INT] NOT NULL IDENTITY,
	[PatientVisitId] [INT] NOT NULL, 
	[SpecialtyId] [INT] NULL, --From [Specialty] table
    [ProcedureCodeId] [TINYINT] NOT NULL, --Procedure Code, MRI, for [SpecialityId], 
    [EventStatusId] [TINYINT] NULL, --Is Schedule, Complete, Reschedule, No Show
    [ReportReceived] [BIT] NULL, -- Has Report received
	[StudyNumber] [NVARCHAR](50) NULL, 
    [Note] [NVARCHAR](250) NULL, 
    [ReportPath] [NVARCHAR](500) NULL, -- Report Physical Path
    [ReadingDoctorId] [INT] NULL, -- Reading Doctor Id
    [BillStatus] [BIT] NULL, -- Billed Or Not Billed
	[BillDate] [DATETIME2] NULL, -- Bill Date
    [BillNumber] [NVARCHAR](50) NULL, -- Bill Number    
    [ImageId] [INT] NULL, --Image of Report
    [Modifier] [NVARCHAR](50) NULL, --ProcedureCode Note/Descr

	[IsDeleted] [bit] NULL DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL, 
    CONSTRAINT [PK_PatientVisitEvent] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[PatientVisitEvent]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisitEvent_PatientVisit_PatientVisitId] FOREIGN KEY([PatientVisitId])
	REFERENCES [dbo].[PatientVisit] ([Id])
GO

ALTER TABLE [dbo].[PatientVisitEvent] CHECK CONSTRAINT [FK_PatientVisitEvent_PatientVisit_PatientVisitId]
GO

ALTER TABLE [dbo].[PatientVisitEvent]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisitEvent_Specialty_SpecialtyId] FOREIGN KEY([SpecialtyId])
	REFERENCES [dbo].[Specialty] ([Id])
GO

ALTER TABLE [dbo].[PatientVisitEvent] CHECK CONSTRAINT [FK_PatientVisitEvent_Specialty_SpecialtyId]
GO


ALTER TABLE [dbo].[PatientVisitEvent]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisitEvent_Doctor_ReadingDoctorId] FOREIGN KEY([ReadingDoctorId])
	REFERENCES [dbo].[Doctor] ([Id])
GO

ALTER TABLE [dbo].[PatientVisitEvent] CHECK CONSTRAINT [FK_PatientVisitEvent_Doctor_ReadingDoctorId]
GO
