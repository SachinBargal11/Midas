CREATE TABLE [dbo].[PatientVisit]
(
	[Id] [INT] NOT NULL IDENTITY,
	[CalendarEventId] INT NOT NULL,
	[CaseId] [INT] NOT NULL,
	[PatientId] [INT] NOT NULL,
	[LocationId] [INT] NOT NULL,
	[RoomId] [INT] NULL,
	[DoctorId] [INT] NULL,
	[SpecialtyId] [INT] NULL,
	[EventStart] [DATETIME2] NULL,
	[EventEnd] [DATETIME2] NULL,
    [Notes] [NVARCHAR](250) NULL, 
    [VisitStatusId] [TINYINT] NULL,
    --[VisitType] [TINYINT] NULL,
    [VisitTypeId] [TINYINT] NULL,
	[IsCancelled] [bit] NULL DEFAULT 0,
	--[FileUploadPath] [NVARCHAR](250) NULL,
	[IsTransportationRequired] [BIT] NOT NULL DEFAULT 0,
	[TransportProviderId] [INT] NULL,

	[IsDeleted] [bit] NULL DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL, 
    CONSTRAINT [PK_PatientVisit] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[PatientVisit]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisit_CalendarEvent_CaseId] FOREIGN KEY([CalendarEventId])
	REFERENCES [dbo].[CalendarEvent] ([Id])
GO

ALTER TABLE [dbo].[PatientVisit] CHECK CONSTRAINT [FK_PatientVisit_CalendarEvent_CaseId]
GO

ALTER TABLE [dbo].[PatientVisit]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisit_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO

ALTER TABLE [dbo].[PatientVisit] CHECK CONSTRAINT [FK_PatientVisit_Case_CaseId]
GO

ALTER TABLE [dbo].[PatientVisit]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisit_Patient_PatientId] FOREIGN KEY([PatientId])
	REFERENCES [dbo].[Patient] ([Id])
GO

ALTER TABLE [dbo].[PatientVisit] CHECK CONSTRAINT [FK_PatientVisit_Patient_PatientId]
GO

ALTER TABLE [dbo].[PatientVisit]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisit_Location_LocationID] FOREIGN KEY([LocationID])
	REFERENCES [dbo].[Location] ([Id])
GO

ALTER TABLE [dbo].[PatientVisit] CHECK CONSTRAINT [FK_PatientVisit_Location_LocationID]
GO

ALTER TABLE [dbo].[PatientVisit]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisit_Room_RoomId] FOREIGN KEY([RoomId])
	REFERENCES [dbo].[Room] ([Id])
GO

ALTER TABLE [dbo].[PatientVisit] CHECK CONSTRAINT [FK_PatientVisit_Room_RoomId]
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

--ALTER TABLE [dbo].[PatientVisit] ADD [IsCancelled] [bit] NULL DEFAULT 0
--GO
--ALTER TABLE [dbo].[PatientVisit] ADD [FileUploadPath] [NVARCHAR](250) NULL
/*
ALTER TABLE [dbo].[PatientVisit] ADD [IsOutOfOffice] [bit] NULL DEFAULT 0
GO
ALTER TABLE [dbo].[PatientVisit] ADD [LeaveStartDate] [DATETIME2] NULL
GO
ALTER TABLE [dbo].[PatientVisit] ADD [LeaveEndDate] [DATETIME2] NULL
GO


ALTER TABLE [dbo].[PatientVisit] ALTER COLUMN [PatientId] [int] NULL;

ALTER TABLE [dbo].[PatientVisit] ALTER COLUMN [CaseId] [int] NULL;
*/

/*
ALTER TABLE [dbo].[PatientVisit] DROP COLUMN [FileUploadPath]
GO
ALTER TABLE [dbo].[PatientVisit] ADD [IsTransportationRequired] [BIT] NULL DEFAULT 0
GO
ALTER TABLE [dbo].[PatientVisit] ADD [TransportProviderId] [INT] NULL
GO
UPDATE [dbo].[PatientVisit] SET [IsTransportationRequired] = 0
GO
ALTER TABLE [dbo].[PatientVisit] ALTER COLUMN [IsTransportationRequired] [BIT] NOT NULL
GO
*/

--ALTER TABLE [dbo].[PatientVisit] ADD [VisitTypeId] TINYINT NULL
--GO
--UPDATE [dbo].[PatientVisit] SET [VisitTypeId] = [VisitType]
--GO
--ALTER TABLE [dbo].[PatientVisit] DROP COLUMN [VisitType]
--GO

--UPDATE [dbo].[PatientVisit] SET [VisitTypeId] = NULL WHERE [VisitTypeId] <= 0
--GO

ALTER TABLE [dbo].[PatientVisit]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisit_VisitType_VisitTypeId] FOREIGN KEY([VisitTypeId])
	REFERENCES [dbo].[VisitType] ([Id])
GO

ALTER TABLE [dbo].[PatientVisit] CHECK CONSTRAINT [FK_PatientVisit_VisitType_VisitTypeId]
GO