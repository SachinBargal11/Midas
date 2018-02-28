CREATE TABLE [dbo].[RefferingOffice] (
    [Id]                 INT           IDENTITY (1, 1) NOT NULL,
    [CaseId]             INT           NOT NULL,
    [RefferingOfficeId]  TINYINT       NULL,
    [AddressInfoId]      INT           NULL,
    [ReffferingDoctorId] TINYINT       NULL,
    [NPI]                NVARCHAR (50) NULL,
    [IsDeleted]          BIT           DEFAULT ((0)) NULL,
    [CreateByUserID]     INT           NOT NULL,
    [CreateDate]         DATETIME2 (7) NOT NULL,
    [UpdateByUserID]     INT           NULL,
    [UpdateDate]         DATETIME2 (7) NULL,
    CONSTRAINT [PK_RefferingOffice] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_RefferingOffice_AddressInfo_AddressInfoId] FOREIGN KEY ([AddressInfoId]) REFERENCES [dbo].[AddressInfo] ([id]),
    CONSTRAINT [FK_RefferingOffice_Case_CaseId] FOREIGN KEY ([CaseId]) REFERENCES [dbo].[Case] ([Id])
);

