IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Referral'
)
BEGIN
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
        [ToCompanyId] INT NULL, 
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
END
ELSE
BEGIN
	PRINT 'Table [dbo].[Referral] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Referral'
	AND		COLUMN_NAME = 'ToCompanyId'
)
BEGIN
	ALTER TABLE [dbo].[Referral] ALTER COLUMN [ToCompanyId] INT NULL
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Referral'
	AND		CONSTRAINT_NAME = 'FK_Referral_Case_CaseId'
)
BEGIN
	ALTER TABLE [dbo].[Referral] 
        DROP CONSTRAINT [FK_Referral_Case_CaseId]
END
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Referral'
	AND		CONSTRAINT_NAME = 'FK_Referral_PendingReferral_PendingReferralId'
)
BEGIN
	ALTER TABLE [dbo].[Referral] 
        DROP CONSTRAINT [FK_Referral_PendingReferral_PendingReferralId]
END
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_PendingReferral_PendingReferralId] FOREIGN KEY([PendingReferralId])
	REFERENCES [dbo].[PendingReferral] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Referral'
	AND		CONSTRAINT_NAME = 'FK_Referral_Company_FromCompanyId'
)
BEGIN
	ALTER TABLE [dbo].[Referral] 
        DROP CONSTRAINT [FK_Referral_Company_FromCompanyId]
END
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Company_FromCompanyId] FOREIGN KEY([FromCompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Referral'
	AND		CONSTRAINT_NAME = 'FK_Referral_Location_FromLocationId'
)
BEGIN
	ALTER TABLE [dbo].[Referral] 
        DROP CONSTRAINT [FK_Referral_Location_FromLocationId]
END
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Location_FromLocationId] FOREIGN KEY([FromLocationId])
	REFERENCES [dbo].[Location] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Referral'
	AND		CONSTRAINT_NAME = 'FK_Referral_Doctor_FromDoctorId'
)
BEGIN
	ALTER TABLE [dbo].[Referral] 
        DROP CONSTRAINT [FK_Referral_Doctor_FromDoctorId]
END
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Doctor_FromDoctorId] FOREIGN KEY([FromDoctorId])
	REFERENCES [dbo].[Doctor] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Referral'
	AND		CONSTRAINT_NAME = 'FK_Referral_User_FromUserId'
)
BEGIN
	ALTER TABLE [dbo].[Referral] 
        DROP CONSTRAINT [FK_Referral_User_FromUserId]
END
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_User_FromUserId] FOREIGN KEY([FromUserId])
	REFERENCES [dbo].[User] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Referral'
	AND		CONSTRAINT_NAME = 'FK_Referral_Specialty_ForSpecialtyId'
)
BEGIN
	ALTER TABLE [dbo].[Referral] 
        DROP CONSTRAINT [FK_Referral_Specialty_ForSpecialtyId]
END
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Specialty_ForSpecialtyId] FOREIGN KEY([ForSpecialtyId])
    REFERENCES [dbo].[Specialty] ([id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Referral'
	AND		CONSTRAINT_NAME = 'FK_Referral_Room_ForRoomId'
)
BEGIN
	ALTER TABLE [dbo].[Referral] 
        DROP CONSTRAINT [FK_Referral_Room_ForRoomId]
END
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Room_ForRoomId] FOREIGN KEY([ForRoomId])
	REFERENCES [dbo].[Room] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Referral'
	AND		CONSTRAINT_NAME = 'FK_Referral_RoomTest_ForRoomTestId'
)
BEGIN
	ALTER TABLE [dbo].[Referral] 
        DROP CONSTRAINT [FK_Referral_RoomTest_ForRoomTestId]
END
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_RoomTest_ForRoomTestId] FOREIGN KEY([ForRoomTestId])
    REFERENCES [dbo].[RoomTest] ([id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Referral'
	AND		CONSTRAINT_NAME = 'FK_Referral_Company_ToCompanyId'
)
BEGIN
	ALTER TABLE [dbo].[Referral] 
        DROP CONSTRAINT [FK_Referral_Company_ToCompanyId]
END
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Company_ToCompanyId] FOREIGN KEY([ToCompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Referral'
	AND		CONSTRAINT_NAME = 'FK_Referral_Location_ToLocationId'
)
BEGIN
	ALTER TABLE [dbo].[Referral] 
        DROP CONSTRAINT [FK_Referral_Location_ToLocationId]
END
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Location_ToLocationId] FOREIGN KEY([ToLocationId])
	REFERENCES [dbo].[Location] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Referral'
	AND		CONSTRAINT_NAME = 'FK_Referral_Doctor_ToDoctorId'
)
BEGIN
	ALTER TABLE [dbo].[Referral] 
        DROP CONSTRAINT [FK_Referral_Doctor_ToDoctorId]
END
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Doctor_ToDoctorId] FOREIGN KEY([ToDoctorId])
	REFERENCES [dbo].[Doctor] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Referral'
	AND		CONSTRAINT_NAME = 'FK_Referral_Room_ToRoomId'
)
BEGIN
	ALTER TABLE [dbo].[Referral] 
        DROP CONSTRAINT [FK_Referral_Room_ToRoomId]
END
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Room_ToRoomId] FOREIGN KEY([ToRoomId])
	REFERENCES [dbo].[Room] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Referral'
	AND		CONSTRAINT_NAME = 'FK_Referral_PatientVisit_ScheduledPatientVisitId'
)
BEGIN
	ALTER TABLE [dbo].[Referral] 
        DROP CONSTRAINT [FK_Referral_PatientVisit_ScheduledPatientVisitId]
END
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_PatientVisit_ScheduledPatientVisitId] FOREIGN KEY([ScheduledPatientVisitId])
	REFERENCES [dbo].[PatientVisit] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Referral'
	AND		CONSTRAINT_NAME = 'FK_Referral_User_DismissedBy'
)
BEGIN
	ALTER TABLE [dbo].[Referral] 
        DROP CONSTRAINT [FK_Referral_User_DismissedBy]
END
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_User_DismissedBy] FOREIGN KEY([DismissedBy])
    REFERENCES [dbo].[User] ([id])
GO
