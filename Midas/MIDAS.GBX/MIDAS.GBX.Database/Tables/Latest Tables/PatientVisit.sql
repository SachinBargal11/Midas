CREATE TABLE [dbo].[PatientVisit]
(
	[Id] [INT] NOT NULL IDENTITY,
	[CaseId] [INT] NOT NULL, 
	[LocationId] [INT] NOT NULL, 
	[SpecialtyId] [INT] NULL,--From [Specialty] table, AC, CH, PT add only visit no event, rest visit add event
    [StartDate] [DATETIME2] NULL, 
    [StartTime] [DATETIME2] NULL, 
    [EndDate] [DATETIME2] NULL, 
    [EndTime] [DATETIME2] NULL, 
    [Notes] [NVARCHAR](250) NULL, 
    [DoctorId] [INT] NULL,     
    [RefferId] [INT] NULL, --Is reffered from another location
    [VisitStatusId] [TINYINT] NULL, --Is Schedule, Complete, Reschedule, No Show
    [BillStatus] [BIT] NULL, -- Billed Or Not Billed
	[BillDate] [DATETIME2] NULL, -- Billed Date
    [BillNumber] [NVARCHAR](50) NULL, -- Bill Number
    [VisitType] [TINYINT] NULL, --IE FU C
    [ReschduleId] [INT] NULL, -- If Rechedule then its Id
    [ReschduleDate] [DATETIME2] NULL, -- If Rechedule then its date
    [StudyNumber] [NVARCHAR](50) NULL, 
    [BillFinalize] [BIT] NULL, 
    [AddedByDoctor] [BIT] NULL DEFAULT 0, 
    [CheckInUserId] [INT] NULL, --Is doctor vist from website
    [BillManualyUnFinalized] [BIT] NULL, --UnFinalized

	[IsDeleted] [bit] NULL DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL, 
    CONSTRAINT [PK_PatientVisits] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[PatientVisit]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisit_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO

ALTER TABLE [dbo].[PatientVisit] CHECK CONSTRAINT [FK_PatientVisit_Case_CaseId]
GO

ALTER TABLE [dbo].[PatientVisit]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisit_Location_LocationID] FOREIGN KEY([LocationID])
	REFERENCES [dbo].[Location] ([Id])
GO

ALTER TABLE [dbo].[PatientVisit] CHECK CONSTRAINT [FK_PatientVisit_Location_LocationID]
GO

ALTER TABLE [dbo].[PatientVisit]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisit_Specialty_SpecialtyId] FOREIGN KEY([SpecialtyId])
	REFERENCES [dbo].[Specialty] ([Id])
GO

ALTER TABLE [dbo].[PatientVisit] CHECK CONSTRAINT [FK_PatientVisit_Specialty_SpecialtyId]
GO

ALTER TABLE [dbo].[PatientVisit]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisit_Doctor_DoctorId] FOREIGN KEY([DoctorId])
	REFERENCES [dbo].[Doctor] ([Id])
GO

ALTER TABLE [dbo].[PatientVisit] CHECK CONSTRAINT [FK_PatientVisit_Doctor_DoctorId]
GO
