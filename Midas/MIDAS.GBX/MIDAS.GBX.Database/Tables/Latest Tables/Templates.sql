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
')
*/
GO

