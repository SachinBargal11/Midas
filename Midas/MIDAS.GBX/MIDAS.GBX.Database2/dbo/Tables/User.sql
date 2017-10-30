﻿CREATE TABLE [dbo].[User] (
    [id]                    INT            IDENTITY (1, 1) NOT NULL,
    [UserName]              NVARCHAR (100) NOT NULL,
    [FirstName]             NVARCHAR (50)  NOT NULL,
    [MiddleName]            NVARCHAR (50)  NULL,
    [LastName]              NVARCHAR (50)  NOT NULL,
    [Gender]                TINYINT        NULL,
    [UserType]              TINYINT        NOT NULL,
    [UserStatus]            TINYINT        NULL,
    [ImageLink]             NVARCHAR (200) NULL,
    [AddressId]             INT            NOT NULL,
    [ContactInfoId]         INT            NOT NULL,
    [DateOfBirth]           DATETIME2 (7)  NULL,
    [Password]              VARCHAR (2000) NULL,
    [IsDeleted]             BIT            CONSTRAINT [DF_User_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID]        INT            NOT NULL,
    [CreateDate]            DATETIME2 (7)  NOT NULL,
    [UpdateByUserID]        INT            NULL,
    [UpdateDate]            DATETIME2 (7)  NULL,
    [2FactAuthEmailEnabled] BIT            CONSTRAINT [DF_User_2FactAuthEmailEnabled] DEFAULT ((1)) NULL,
    [2FactAuthSMSEnabled]   BIT            CONSTRAINT [DF_User_2FactAuthSMSEnabled] DEFAULT ((1)) NULL,
    CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_User_AddressInfo] FOREIGN KEY ([AddressId]) REFERENCES [dbo].[AddressInfo] ([id]),
    CONSTRAINT [FK_User_ContactInfo] FOREIGN KEY ([ContactInfoId]) REFERENCES [dbo].[ContactInfo] ([id]),
    CONSTRAINT [FK_User_UserType] FOREIGN KEY ([UserType]) REFERENCES [dbo].[UserType] ([id])
);

