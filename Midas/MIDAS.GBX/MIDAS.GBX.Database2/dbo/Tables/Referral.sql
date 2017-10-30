﻿CREATE TABLE [dbo].[Referral] (
    [Id]                      INT           IDENTITY (1, 1) NOT NULL,
    [PendingReferralId]       INT           NULL,
    [FromCompanyId]           INT           NOT NULL,
    [FromLocationId]          INT           NULL,
    [FromDoctorId]            INT           NULL,
    [ForSpecialtyId]          INT           NULL,
    [ForRoomId]               INT           NULL,
    [ForRoomTestId]           INT           NULL,
    [ToCompanyId]             INT           NULL,
    [ToLocationId]            INT           NULL,
    [ToDoctorId]              INT           NULL,
    [ToRoomId]                INT           NULL,
    [ScheduledPatientVisitId] INT           NULL,
    [DismissedBy]             INT           NULL,
    [IsDeleted]               BIT           DEFAULT ((0)) NULL,
    [CreateByUserID]          INT           NOT NULL,
    [CreateDate]              DATETIME2 (7) NOT NULL,
    [UpdateByUserID]          INT           NULL,
    [UpdateDate]              DATETIME2 (7) NULL,
    [CaseId]                  INT           NOT NULL,
    [FromUserId]              INT           NULL,
    CONSTRAINT [PK_Referral] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Referral_Case_CaseId] FOREIGN KEY ([CaseId]) REFERENCES [dbo].[Case] ([Id]),
    CONSTRAINT [FK_Referral_Company_FromCompanyId] FOREIGN KEY ([FromCompanyId]) REFERENCES [dbo].[Company] ([id]),
    CONSTRAINT [FK_Referral_Company_ToCompanyId] FOREIGN KEY ([ToCompanyId]) REFERENCES [dbo].[Company] ([id]),
    CONSTRAINT [FK_Referral_Doctor_FromDoctorId] FOREIGN KEY ([FromDoctorId]) REFERENCES [dbo].[Doctor] ([Id]),
    CONSTRAINT [FK_Referral_Doctor_ToDoctorId] FOREIGN KEY ([ToDoctorId]) REFERENCES [dbo].[Doctor] ([Id]),
    CONSTRAINT [FK_Referral_Location_FromLocationId] FOREIGN KEY ([FromLocationId]) REFERENCES [dbo].[Location] ([id]),
    CONSTRAINT [FK_Referral_Location_ToLocationId] FOREIGN KEY ([ToLocationId]) REFERENCES [dbo].[Location] ([id]),
    CONSTRAINT [FK_Referral_PatientVisit_ScheduledPatientVisitId] FOREIGN KEY ([ScheduledPatientVisitId]) REFERENCES [dbo].[PatientVisit] ([Id]),
    CONSTRAINT [FK_Referral_PendingReferral_PendingReferralId] FOREIGN KEY ([PendingReferralId]) REFERENCES [dbo].[PendingReferral] ([Id]),
    CONSTRAINT [FK_Referral_Room_ForRoomId] FOREIGN KEY ([ForRoomId]) REFERENCES [dbo].[Room] ([id]),
    CONSTRAINT [FK_Referral_Room_ToRoomId] FOREIGN KEY ([ToRoomId]) REFERENCES [dbo].[Room] ([id]),
    CONSTRAINT [FK_Referral_RoomTest_ForRoomTestId] FOREIGN KEY ([ForRoomTestId]) REFERENCES [dbo].[RoomTest] ([id]),
    CONSTRAINT [FK_Referral_Specialty_ForSpecialtyId] FOREIGN KEY ([ForSpecialtyId]) REFERENCES [dbo].[Specialty] ([id]),
    CONSTRAINT [FK_Referral_User_DismissedBy] FOREIGN KEY ([DismissedBy]) REFERENCES [dbo].[User] ([id]),
    CONSTRAINT [FK_Referral_User_FromUserId] FOREIGN KEY ([FromUserId]) REFERENCES [dbo].[User] ([id])
);

