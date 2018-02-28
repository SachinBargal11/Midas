CREATE TABLE [dbo].[UserApiRoleMapping] (
    [ID]      INT           NOT NULL,
    [API]     VARCHAR (100) NULL,
    [ROLES]   VARCHAR (50)  NULL,
    [METHODS] VARCHAR (100) NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC)
);

