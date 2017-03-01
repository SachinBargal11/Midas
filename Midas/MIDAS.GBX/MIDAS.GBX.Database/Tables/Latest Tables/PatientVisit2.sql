CREATE TABLE [dbo].[PatientVisit2]
(
	[Id] [INT] NOT NULL IDENTITY,--**************
	[CalendarEventId] INT NOT NULL,--**************
	[CaseId] [INT] NOT NULL, --10 ------ GET optional--**************
	[PatientId] [INT] NOT NULL, ------ GET--**************	
	[LocationId] [INT] NOT NULL,  ------ GET--**************
	[RoomId] [INT] NOT NULL,------ GET, --**************
	[DoctorId] [INT] NULL,     --15--**************
	[SpecialtyId] [INT] NULL,--From [Specialty] table, AC, CH, PT add only visit no event, rest visit add event
	[EventStart] [DATETIME2] NULL,
	[EventEnd] [DATETIME2] NULL,
    [Notes] [NVARCHAR](250) NULL, 
    --[RefferId] [INT] NULL, --Is reffered from another location
    [VisitStatusId] [TINYINT] NULL, --Is Schedule, Complete, Reschedule, No Show--**************
    --[BillStatus] [BIT] NULL, -- Billed Or Not Billed
	--[BillDate] [DATETIME2] NULL, -- Billed Date
    --[BillNumber] [NVARCHAR](50) NULL, -- Bill Number
    [VisitType] [TINYINT] NULL, --IE FU C--Rageesh--**************
    --[ReschduleId] [INT] NULL, -- If Rechedule then its Id
    --[ReschduleDate] [DATETIME2] NULL, -- If Rechedule then its date
    --[StudyNumber] [NVARCHAR](50) NULL, 
    --[BillFinalize] [BIT] NULL, 
    --[AddedByDoctor] [BIT] NULL DEFAULT 0, 
    --[CheckInUserId] [INT] NULL, 
    --Is doctor vist from website
    --[BillManualyUnFinalized] [BIT] NULL, --UnFinalized

	[IsDeleted] [bit] NULL DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL, 
    CONSTRAINT [PK_PatientVisits] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[PatientVisit2]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisit2_CalendarEvent_CaseId] FOREIGN KEY([CalendarEventId])
	REFERENCES [dbo].[CalendarEvent] ([Id])
GO

ALTER TABLE [dbo].[PatientVisit2] CHECK CONSTRAINT [FK_PatientVisit2_CalendarEvent_CaseId]
GO

ALTER TABLE [dbo].[PatientVisit2]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisit2_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO

ALTER TABLE [dbo].[PatientVisit2] CHECK CONSTRAINT [FK_PatientVisit2_Case_CaseId]
GO

ALTER TABLE [dbo].[PatientVisit2]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisit2_Patient2_PatientId] FOREIGN KEY([PatientId])
	REFERENCES [dbo].[Patient2] ([Id])
GO

ALTER TABLE [dbo].[PatientVisit2] CHECK CONSTRAINT [FK_PatientVisit2_Patient2_PatientId]
GO

ALTER TABLE [dbo].[PatientVisit2]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisit2_Location_LocationID] FOREIGN KEY([LocationID])
	REFERENCES [dbo].[Location] ([Id])
GO

ALTER TABLE [dbo].[PatientVisit2] CHECK CONSTRAINT [FK_PatientVisit2_Location_LocationID]
GO

ALTER TABLE [dbo].[PatientVisit2]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisit2_Room_RoomId] FOREIGN KEY([RoomId])
	REFERENCES [dbo].[Room] ([Id])
GO

ALTER TABLE [dbo].[PatientVisit2] CHECK CONSTRAINT [FK_PatientVisit2_Room_RoomId]
GO

ALTER TABLE [dbo].[PatientVisit2]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisit2_Specialty_SpecialtyId] FOREIGN KEY([SpecialtyId])
	REFERENCES [dbo].[Specialty] ([Id])
GO

ALTER TABLE [dbo].[PatientVisit2] CHECK CONSTRAINT [FK_PatientVisit2_Specialty_SpecialtyId]
GO

ALTER TABLE [dbo].[PatientVisit2]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisit2_Doctor_DoctorId] FOREIGN KEY([DoctorId])
	REFERENCES [dbo].[Doctor] ([Id])
GO

ALTER TABLE [dbo].[PatientVisit2] CHECK CONSTRAINT [FK_PatientVisit2_Doctor_DoctorId]
GO
