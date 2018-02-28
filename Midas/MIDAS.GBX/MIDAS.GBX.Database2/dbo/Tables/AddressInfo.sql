CREATE TABLE [dbo].[AddressInfo] (
    [id]             INT            IDENTITY (1, 1) NOT NULL,
    [Name]           NVARCHAR (50)  NULL,
    [Address1]       NVARCHAR (200) NULL,
    [Address2]       NVARCHAR (200) NULL,
    [City]           NVARCHAR (50)  NULL,
    [State]          NVARCHAR (50)  NULL,
    [StateCode]      NVARCHAR (2)   NULL,
    [ZipCode]        NVARCHAR (10)  NULL,
    [Country]        NVARCHAR (50)  NULL,
    [IsDeleted]      BIT            CONSTRAINT [DF_AddressInfo_IsDeleted] DEFAULT 0 NULL,
    [CreateByUserID] INT            NOT NULL,
    [CreateDate]     DATETIME2 (7)  NOT NULL,
    [UpdateByUserID] INT            NULL,
    [UpdateDate]     DATETIME2 (7)  NULL,
    CONSTRAINT [PK_AddressInfo] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_AddressInfo_State_StateCode] FOREIGN KEY ([StateCode]) REFERENCES [dbo].[State] ([StateCode])
);

