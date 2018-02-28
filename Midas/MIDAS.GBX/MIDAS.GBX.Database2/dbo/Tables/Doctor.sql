CREATE TABLE [dbo].[Doctor] (
    [Id]               INT           NOT NULL,
    [LicenseNumber]    NVARCHAR (50) NULL,
    [WCBAuthorization] NVARCHAR (50) NULL,
    [WcbRatingCode]    NVARCHAR (50) NULL,
    [NPI]              NVARCHAR (50) NULL,
    [Title]            NVARCHAR (10) NULL,
    [IsDeleted]        BIT           CONSTRAINT [DF_Doctor_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID]   INT           NOT NULL,
    [CreateDate]       DATETIME2 (7) NOT NULL,
    [UpdateByUserID]   INT           NULL,
    [UpdateDate]       DATETIME2 (7) NULL,
    [IsCalendarPublic] BIT           NOT NULL,
    [TaxTypeId]        TINYINT       NULL,
    [GenderId]         TINYINT       DEFAULT ((1)) NOT NULL,
    CONSTRAINT [PK_Doctor] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Doctor_DoctorTaxType_TaxTypeId] FOREIGN KEY ([TaxTypeId]) REFERENCES [dbo].[DoctorTaxType] ([Id]),
    CONSTRAINT [FK_Doctor_Gender_GenderId] FOREIGN KEY ([GenderId]) REFERENCES [dbo].[Gender] ([Id]),
    CONSTRAINT [FK_Doctor_User] FOREIGN KEY ([Id]) REFERENCES [dbo].[User] ([id])
);

