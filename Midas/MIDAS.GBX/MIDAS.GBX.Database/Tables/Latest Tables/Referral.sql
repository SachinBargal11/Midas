CREATE TABLE [dbo].[Referral]
(
	[Id] INT NOT NULL IDENTITY(1, 1),
    [CaseId] INT NULL,
    [PendingReferralId] INT NOT NULL, 
	[FromCompanyId] INT NOT NULL, 
    [FromLocationId] INT NULL, 
	[FromDoctorId] INT NULL,
    [FromUserId] INT NOT NULL,
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
    CONSTRAINT [PK_Referral] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_PendingReferral_PendingReferralId] FOREIGN KEY([PendingReferralId])
	REFERENCES [dbo].[PendingReferral] ([Id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_PendingReferral_PendingReferralId]
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Company_FromCompanyId] FOREIGN KEY([FromCompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_Company_FromCompanyId]
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Location_FromLocationId] FOREIGN KEY([FromLocationId])
	REFERENCES [dbo].[Location] ([Id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_Location_FromLocationId]
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Doctor_FromDoctorId] FOREIGN KEY([FromDoctorId])
	REFERENCES [dbo].[Doctor] ([Id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_Doctor_FromDoctorId]
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Specialty_ForSpecialtyId] FOREIGN KEY([ForSpecialtyId])
    REFERENCES [dbo].[Specialty] ([id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_Specialty_ForSpecialtyId]
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Room_ForRoomId] FOREIGN KEY([ForRoomId])
	REFERENCES [dbo].[Room] ([Id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_Room_ForRoomId]
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_RoomTest_ForRoomTestId] FOREIGN KEY([ForRoomTestId])
    REFERENCES [dbo].[RoomTest] ([id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_RoomTest_ForRoomTestId]
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Company_ToCompanyId] FOREIGN KEY([ToCompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_Company_ToCompanyId]
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Location_ToLocationId] FOREIGN KEY([ToLocationId])
	REFERENCES [dbo].[Location] ([Id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_Location_ToLocationId]
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Doctor_ToDoctorId] FOREIGN KEY([ToDoctorId])
	REFERENCES [dbo].[Doctor] ([Id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_Doctor_ToDoctorId]
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Room_ToRoomId] FOREIGN KEY([ToRoomId])
	REFERENCES [dbo].[Room] ([Id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_Room_ToRoomId]
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_PatientVisit_ScheduledPatientVisitId] FOREIGN KEY([ScheduledPatientVisitId])
	REFERENCES [dbo].[PatientVisit] ([Id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_PatientVisit_ScheduledPatientVisitId]
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_User_DismissedBy] FOREIGN KEY([DismissedBy])
    REFERENCES [dbo].[User] ([id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_User_DismissedBy]
GO

/*
ALTER TABLE [dbo].[Referral] ALTER COLUMN [PendingReferralId] INT NULL
GO

ALTER TABLE [dbo].[Referral] ADD [CaseId] INT NULL
GO

UPDATE [dbo].[Referral] 
    SET [CaseId] = (SELECT TOP 1 [CaseId] FROM [dbo].[PatientVisit] 
        WHERE [Id] = (SELECT TOP 1 [PatientVisitId] FROM [dbo].[PendingReferral] WHERE [Id] = PendingReferralId))
GO
ALTER TABLE [dbo].[Referral] ALTER COLUMN [CaseId] INT NOT NULL
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Case_CaseId] FOREIGN KEY([CaseId])
    REFERENCES [dbo].[Case] ([id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_Case_CaseId]
GO
*/
/*
ALTER TABLE [dbo].[Referral] ALTER COLUMN [FromDoctorId] INT NULL
GO

ALTER TABLE [dbo].[Referral] ADD [FromUserId] INT NULL
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_User_FromUserId] FOREIGN KEY([FromUserId])
    REFERENCES [dbo].[User] ([id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_User_FromUserId]
GO

ALTER TABLE [dbo].[Referral] ALTER COLUMN [FromLocationId] INT NULL
GO
*/