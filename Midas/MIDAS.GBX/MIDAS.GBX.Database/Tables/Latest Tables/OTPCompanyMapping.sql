IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'OTPCompanyMapping'
)
BEGIN
    CREATE TABLE [dbo].[OTPCompanyMapping]
    (
        [Id] [INT] NOT NULL IDENTITY(1,1),
        [OTP] [NVARCHAR](12) NOT NULL, 
        [CompanyId] [INT] NOT NULL, 
        [ValidUntil] [DATETIME2] NOT NULL,
        [UsedByCompanyId] [INT] NULL, 
        [UsedAtDate] [DATETIME2] NULL, 
        [IsCancelled] [BIT] NULL CONSTRAINT [DF_OTPCompanyMapping_IsCancelled] DEFAULT 0,
        [IsDeleted] [BIT] NULL CONSTRAINT [DF_OTPCompanyMapping_IsDeleted] DEFAULT 0,
	    [CreateByUserID] [INT] NOT NULL,
	    [CreateDate] [DATETIME2](7) NOT NULL,
	    [UpdateByUserID] [INT] NULL,
	    [UpdateDate] [DATETIME2](7) NULL,
        [OTPForDate] AS CAST([ValidUntil] AS DATE),
        CONSTRAINT [PK_OTPCompanyMapping] PRIMARY KEY ([Id]),
        CONSTRAINT [PK_OTPCompanyMapping_OTP_ValidUntil] UNIQUE ([OTP], [OTPForDate])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[OTPCompanyMapping] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'OTPCompanyMapping'
	AND		CONSTRAINT_NAME = 'FK_OTPCompanyMapping_Company_CompanyId'
)
BEGIN
	ALTER TABLE [dbo].[OTPCompanyMapping] 
        DROP CONSTRAINT [FK_OTPCompanyMapping_Company_CompanyId]
END
GO

ALTER TABLE [dbo].[OTPCompanyMapping] ADD CONSTRAINT [FK_OTPCompanyMapping_Company_CompanyId] FOREIGN KEY([CompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'OTPCompanyMapping'
	AND		CONSTRAINT_NAME = 'FK_OTPCompanyMapping_Company_UsedByCompanyId'
)
BEGIN
	ALTER TABLE [dbo].[OTPCompanyMapping] 
        DROP CONSTRAINT [FK_OTPCompanyMapping_Company_UsedByCompanyId]
END
GO

ALTER TABLE [dbo].[OTPCompanyMapping] ADD CONSTRAINT [FK_OTPCompanyMapping_Company_UsedByCompanyId] FOREIGN KEY([UsedByCompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO
