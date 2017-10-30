﻿CREATE TABLE [dbo].[PendingReferral] (
    [Id]                INT           IDENTITY (1, 1) NOT NULL,
    [PatientVisitId]    INT           NOT NULL,
    [FromCompanyId]     INT           NOT NULL,
    [FromLocationId]    INT           NOT NULL,
    [FromDoctorId]      INT           NOT NULL,
    [ForSpecialtyId]    INT           NULL,
    [ForRoomId]         INT           NULL,
    [ForRoomTestId]     INT           NULL,
    [IsReferralCreated] BIT           CONSTRAINT [DF_PendingReferral_IsReferralCreated] DEFAULT ((0)) NULL,
    [IsDeleted]         BIT           DEFAULT ((0)) NULL,
    [CreateByUserID]    INT           NOT NULL,
    [CreateDate]        DATETIME2 (7) NOT NULL,
    [UpdateByUserID]    INT           NULL,
    [UpdateDate]        DATETIME2 (7) NULL,
    [DismissedBy]       INT           NULL,
    CONSTRAINT [PK_PendingReferral] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PendingReferral_Company_FromCompanyId] FOREIGN KEY ([FromCompanyId]) REFERENCES [dbo].[Company] ([id]),
    CONSTRAINT [FK_PendingReferral_Doctor_FromDoctorId] FOREIGN KEY ([FromDoctorId]) REFERENCES [dbo].[Doctor] ([Id]),
    CONSTRAINT [FK_PendingReferral_Location_FromLocationId] FOREIGN KEY ([FromLocationId]) REFERENCES [dbo].[Location] ([id]),
    CONSTRAINT [FK_PendingReferral_PatientVisit_PatientVisitId] FOREIGN KEY ([PatientVisitId]) REFERENCES [dbo].[PatientVisit] ([Id]),
    CONSTRAINT [FK_PendingReferral_Room_ForRoomId] FOREIGN KEY ([ForRoomId]) REFERENCES [dbo].[Room] ([id]),
    CONSTRAINT [FK_PendingReferral_RoomTest_ForRoomTestId] FOREIGN KEY ([ForRoomTestId]) REFERENCES [dbo].[RoomTest] ([id]),
    CONSTRAINT [FK_PendingReferral_Specialty_ForSpecialtyId] FOREIGN KEY ([ForSpecialtyId]) REFERENCES [dbo].[Specialty] ([id]),
    CONSTRAINT [FK_PendingReferral_User_DismissedBy] FOREIGN KEY ([DismissedBy]) REFERENCES [dbo].[User] ([id])
);

