CREATE TABLE [dbo].[PendingReferral]
(
	[Id] INT NOT NULL IDENTITY(1, 1),
    [PatientVisitId] [INT] NOT NULL,
	[FromCompanyId] INT NOT NULL, 
    [FromLocationId] INT NOT NULL, 
	[FromDoctorId] INT NOT NULL,
	[ForSpecialtyId] INT NULL,
    [ForRoomId] INT NULL, 
	[ForRoomTestId] INT NULL,
	[IsReferralCreated] [BIT] NULL CONSTRAINT [DF_PendingReferral_IsReferralCreated] DEFAULT 0,

	[IsDeleted] [bit] NULL DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
    CONSTRAINT [PK_PendingReferral] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[PendingReferral]  WITH CHECK ADD  CONSTRAINT [FK_PendingReferral_PatientVisit_CaseId] FOREIGN KEY([PatientVisitId])
	REFERENCES [dbo].[PatientVisit2] ([Id])
GO

ALTER TABLE [dbo].[PendingReferral] CHECK CONSTRAINT [FK_PendingReferral_PatientVisit_CaseId]
GO

ALTER TABLE [dbo].[PendingReferral]  WITH CHECK ADD  CONSTRAINT [FK_PendingReferral_Company_FromCompanyId] FOREIGN KEY([FromCompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[PendingReferral] CHECK CONSTRAINT [FK_PendingReferral_Company_FromCompanyId]
GO

ALTER TABLE [dbo].[PendingReferral]  WITH CHECK ADD  CONSTRAINT [FK_PendingReferral_Location_FromLocationId] FOREIGN KEY([FromLocationId])
	REFERENCES [dbo].[Location] ([Id])
GO

ALTER TABLE [dbo].[PendingReferral] CHECK CONSTRAINT [FK_PendingReferral_Location_FromLocationId]
GO

ALTER TABLE [dbo].[PendingReferral]  WITH CHECK ADD  CONSTRAINT [FK_PendingReferral_Doctor_FromDoctorId] FOREIGN KEY([FromDoctorId])
	REFERENCES [dbo].[Doctor] ([Id])
GO

ALTER TABLE [dbo].[PendingReferral] CHECK CONSTRAINT [FK_PendingReferral_Doctor_FromDoctorId]
GO

ALTER TABLE [dbo].[PendingReferral]  WITH CHECK ADD  CONSTRAINT [FK_PendingReferral_Specialty_ForSpecialtyId] FOREIGN KEY([ForSpecialtyId])
    REFERENCES [dbo].[Specialty] ([id])
GO

ALTER TABLE [dbo].[PendingReferral] CHECK CONSTRAINT [FK_PendingReferral_Specialty_ForSpecialtyId]
GO

ALTER TABLE [dbo].[PendingReferral]  WITH CHECK ADD  CONSTRAINT [FK_PendingReferral_Room_ForRoomId] FOREIGN KEY([ForRoomId])
	REFERENCES [dbo].[Room] ([Id])
GO

ALTER TABLE [dbo].[PendingReferral] CHECK CONSTRAINT [FK_PendingReferral_Room_ForRoomId]
GO

ALTER TABLE [dbo].[PendingReferral]  WITH CHECK ADD  CONSTRAINT [FK_PendingReferral_RoomTest_ForRoomTestId] FOREIGN KEY([ForRoomTestId])
    REFERENCES [dbo].[RoomTest] ([id])
GO

ALTER TABLE [dbo].[PendingReferral] CHECK CONSTRAINT [FK_PendingReferral_RoomTest_ForRoomTestId]
GO
