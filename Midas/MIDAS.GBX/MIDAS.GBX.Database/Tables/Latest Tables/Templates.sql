IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Templates'
)
BEGIN
    CREATE TABLE [dbo].[Templates]
    (
	    [Id] [INT] NOT NULL IDENTITY,
	    [TemplateType] NVARCHAR(50) NOT NULL,	
	    [FileData] VARCHAR(MAX) NOT NULL, 

	    [IsDeleted] [BIT] NULL,
	    [CreateByUserID] [INT] NOT NULL,
	    [CreateDate] [DATETIME2](7) NOT NULL,
	    [UpdateByUserID] [INT] NULL,
	    [UpdateDate] [DATETIME2](7) NULL,

        CONSTRAINT [PK_Templates] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[Templates] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Templates'
	AND		CONSTRAINT_NAME = 'DF_Templates_FileData'
)
BEGIN
	ALTER TABLE [dbo].[Templates] DROP CONSTRAINT [DF_Templates_FileData]
END
GO

ALTER TABLE [dbo].[Templates] ADD DEFAULT N'<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Consent Form</title>
    </head>
    <body>
        <div>
            <h1>Consent</h1>
            <p><b>Company name :</b> <i>{{CompanyName}}</i></p>
        </div>
        <div>
            <div>
			    <div><b>Patient name : </b><i>{{PatientName}}</i></div>
            </div>
        </div><br/>
        <div><img src="{{Signature}}" style="width:250px;height:70px;" border="0.5"></div>
    </body>
</html>' FOR [FileData]
GO


/*
INSERT INTO [dbo].[Templates]
           ([TemplateType]
           ,[FileData]
           ,[IsDeleted]
           ,[CreateByUserID]
           ,[CreateDate]
           ,[UpdateByUserID]
           ,[UpdateDate])
     VALUES
           ('REFERRAL'
           ,N'<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Your ASP.NET application</title>
        
</head>
<body>

    <div>
        <h1>Referral Form</h1>
        <p>Company name : {{CompanyName}}</p>
    </div>

    <div>
        <div>            
   <div>Patient name: {{PatientName}}</div> 
   <div>Referal order date : {{CreateDate}}</div> 
   <div>Referral: {{ReferredToDoctor}}</div> 
   <div>Referral information: {{Note}}</div> 
        </div>

        </div>
    </div>
</body>
</html>
', NULL, 0, GETDATE(), NULL, NULL)
*/
GO

