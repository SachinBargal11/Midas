CREATE TABLE [dbo].[Referral2]
(
	[Id] INT NOT NULL IDENTITY(1, 1),
    [PendingReferralId] INT NOT NULL, 
	[FromCompanyId] INT NOT NULL, 
    [FromLocationId] INT NOT NULL, 
	[FromDoctorId] INT NOT NULL,
    [ForSpecialtyId] INT NULL,
    [ForRoomId] INT NULL, 
    [ForRoomTestId] INT NULL,
    [ToCompanyId] INT NOT NULL, 
    [ToLocationId] INT NULL, 
    [ToDoctorId] INT NULL, 
    [ToRoomId] INT NULL, 
    [ScheduledPatientVisitId] INT NULL,
	[DismissedBy] INT NULL,

	[IsDeleted] [bit] NULL DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
    CONSTRAINT [PK_Referral2] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[Referral2]  WITH CHECK ADD  CONSTRAINT [FK_Referral2_PendingReferral_PendingReferralId] FOREIGN KEY([PendingReferralId])
	REFERENCES [dbo].[PendingReferral] ([Id])
GO

ALTER TABLE [dbo].[Referral2] CHECK CONSTRAINT [FK_Referral2_PendingReferral_PendingReferralId]
GO

ALTER TABLE [dbo].[Referral2]  WITH CHECK ADD  CONSTRAINT [FK_Referral2_Company_FromCompanyId] FOREIGN KEY([FromCompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[Referral2] CHECK CONSTRAINT [FK_Referral2_Company_FromCompanyId]
GO

ALTER TABLE [dbo].[Referral2]  WITH CHECK ADD  CONSTRAINT [FK_Referral2_Location_FromLocationId] FOREIGN KEY([FromLocationId])
	REFERENCES [dbo].[Location] ([Id])
GO

ALTER TABLE [dbo].[Referral2] CHECK CONSTRAINT [FK_Referral2_Location_FromLocationId]
GO

ALTER TABLE [dbo].[Referral2]  WITH CHECK ADD  CONSTRAINT [FK_Referral2_Doctor_FromDoctorId] FOREIGN KEY([FromDoctorId])
	REFERENCES [dbo].[Doctor] ([Id])
GO

ALTER TABLE [dbo].[Referral2] CHECK CONSTRAINT [FK_Referral2_Doctor_FromDoctorId]
GO

ALTER TABLE [dbo].[Referral2]  WITH CHECK ADD  CONSTRAINT [FK_Referral2_Specialty_ForSpecialtyId] FOREIGN KEY([ForSpecialtyId])
    REFERENCES [dbo].[Specialty] ([id])
GO

ALTER TABLE [dbo].[Referral2] CHECK CONSTRAINT [FK_Referral2_Specialty_ForSpecialtyId]
GO

ALTER TABLE [dbo].[Referral2]  WITH CHECK ADD  CONSTRAINT [FK_Referral2_Room_ForRoomId] FOREIGN KEY([ForRoomId])
	REFERENCES [dbo].[Room] ([Id])
GO

ALTER TABLE [dbo].[Referral2] CHECK CONSTRAINT [FK_Referral2_Room_ForRoomId]
GO

ALTER TABLE [dbo].[Referral2]  WITH CHECK ADD  CONSTRAINT [FK_Referral2_RoomTest_ForRoomTestId] FOREIGN KEY([ForRoomTestId])
    REFERENCES [dbo].[RoomTest] ([id])
GO

ALTER TABLE [dbo].[Referral2] CHECK CONSTRAINT [FK_Referral2_RoomTest_ForRoomTestId]
GO

ALTER TABLE [dbo].[Referral2]  WITH CHECK ADD  CONSTRAINT [FK_Referral2_Company_ToCompanyId] FOREIGN KEY([ToCompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[Referral2] CHECK CONSTRAINT [FK_Referral2_Company_ToCompanyId]
GO

ALTER TABLE [dbo].[Referral2]  WITH CHECK ADD  CONSTRAINT [FK_Referral2_Location_ToLocationId] FOREIGN KEY([ToLocationId])
	REFERENCES [dbo].[Location] ([Id])
GO

ALTER TABLE [dbo].[Referral2] CHECK CONSTRAINT [FK_Referral2_Location_ToLocationId]
GO

ALTER TABLE [dbo].[Referral2]  WITH CHECK ADD  CONSTRAINT [FK_Referral2_Doctor_ToDoctorId] FOREIGN KEY([ToDoctorId])
	REFERENCES [dbo].[Doctor] ([Id])
GO

ALTER TABLE [dbo].[Referral2] CHECK CONSTRAINT [FK_Referral2_Doctor_ToDoctorId]
GO

ALTER TABLE [dbo].[Referral2]  WITH CHECK ADD  CONSTRAINT [FK_Referral2_Room_ToRoomId] FOREIGN KEY([ToRoomId])
	REFERENCES [dbo].[Room] ([Id])
GO

ALTER TABLE [dbo].[Referral2] CHECK CONSTRAINT [FK_Referral2_Room_ToRoomId]
GO

ALTER TABLE [dbo].[Referral2]  WITH CHECK ADD  CONSTRAINT [FK_Referral2_PatientVisit2_ScheduledPatientVisitId] FOREIGN KEY([ScheduledPatientVisitId])
	REFERENCES [dbo].[PatientVisit2] ([Id])
GO

ALTER TABLE [dbo].[Referral2] CHECK CONSTRAINT [FK_Referral2_PatientVisit2_ScheduledPatientVisitId]
GO

ALTER TABLE [dbo].[Referral2]  WITH CHECK ADD  CONSTRAINT [FK_Referral2_User_DismissedBy] FOREIGN KEY([DismissedBy])
    REFERENCES [dbo].[User] ([id])
GO

ALTER TABLE [dbo].[Referral2] CHECK CONSTRAINT [FK_Referral2_User_DismissedBy]
GO

