CREATE TABLE [dbo].[ProcedureCode] (
    [Id]                INT            IDENTITY (1, 1) NOT NULL,
    [ProcedureCodeText] NVARCHAR (50)  NOT NULL,
    [ProcedureCodeDesc] NVARCHAR (250) NULL,
    [CompanyId]         INT            NULL,
    [Amount]            MONEY          NULL,
    [SpecialityId]      INT            NULL,
    [RoomId]            INT            NULL,
    [RoomTestId]        INT            NULL,
    [IsDeleted]         BIT            DEFAULT ((0)) NULL,
    [CreateByUserID]    INT            NOT NULL,
    [CreateDate]        DATETIME2 (7)  NOT NULL,
    [UpdateByUserID]    INT            NULL,
    [UpdateDate]        DATETIME2 (7)  NULL,
    CONSTRAINT [PK_ProcedureCode] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_ProcedureCode_Company_CompanyId] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([id]),
    CONSTRAINT [FK_ProcedureCode_Room_SpecialityId] FOREIGN KEY ([RoomId]) REFERENCES [dbo].[Room] ([id]),
    CONSTRAINT [FK_ProcedureCode_Roomt_RoomId] FOREIGN KEY ([RoomId]) REFERENCES [dbo].[Room] ([id]),
    CONSTRAINT [FK_ProcedureCode_RoomTest_RoomTestId] FOREIGN KEY ([RoomTestId]) REFERENCES [dbo].[RoomTest] ([id]),
    CONSTRAINT [FK_ProcedureCode_Speciality_SpecialityId] FOREIGN KEY ([SpecialityId]) REFERENCES [dbo].[Specialty] ([id])
);

