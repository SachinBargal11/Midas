CREATE TABLE [dbo].[OTPCompanyMapping] (
    [Id]              INT           IDENTITY (1, 1) NOT NULL,
    [OTP]             NVARCHAR (12) NOT NULL,
    [CompanyId]       INT           NOT NULL,
    [ValidUntil]      DATETIME2 (7) NOT NULL,
    [UsedByCompanyId] INT           NULL,
    [UsedAtDate]      DATETIME2 (7) NULL,
    [IsCancelled]     BIT           CONSTRAINT [DF_OTPCompanyMapping_IsCancelled] DEFAULT ((0)) NULL,
    [IsDeleted]       BIT           CONSTRAINT [DF_OTPCompanyMapping_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID]  INT           NOT NULL,
    [CreateDate]      DATETIME2 (7) NOT NULL,
    [UpdateByUserID]  INT           NULL,
    [UpdateDate]      DATETIME2 (7) NULL,
    [OTPForDate]      AS            (CONVERT([date],[ValidUntil],0)),
    CONSTRAINT [PK_OTPCompanyMapping] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_OTPCompanyMapping_Company_CompanyId] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([id]),
    CONSTRAINT [FK_OTPCompanyMapping_Company_UsedByCompanyId] FOREIGN KEY ([UsedByCompanyId]) REFERENCES [dbo].[Company] ([id]),
    CONSTRAINT [PK_OTPCompanyMapping_OTP_ValidUntil] UNIQUE NONCLUSTERED ([OTP] ASC, [OTPForDate] ASC)
);

