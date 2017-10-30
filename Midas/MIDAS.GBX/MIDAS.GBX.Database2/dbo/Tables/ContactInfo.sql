CREATE TABLE [dbo].[ContactInfo] (
    [id]                     INT            IDENTITY (1, 1) NOT NULL,
    [Name]                   NVARCHAR (50)  NULL,
    [CellPhone]              NVARCHAR (50)  NULL,
    [EmailAddress]           NVARCHAR (200) NULL,
    [HomePhone]              NVARCHAR (50)  NULL,
    [WorkPhone]              NVARCHAR (50)  NULL,
    [FaxNo]                  NVARCHAR (50)  NULL,
    [IsDeleted]              BIT            CONSTRAINT [DF_ContactInfo_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID]         INT            NOT NULL,
    [CreateDate]             DATETIME2 (7)  NOT NULL,
    [UpdateByUserID]         INT            NULL,
    [UpdateDate]             DATETIME2 (7)  NULL,
    [OfficeExtension]        VARCHAR (20)   NULL,
    [AlternateEmail]         NVARCHAR (100) NULL,
    [PreferredCommunication] TINYINT        NULL,
    CONSTRAINT [PK_ContactInfo] PRIMARY KEY CLUSTERED ([id] ASC)
);

