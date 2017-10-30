CREATE TABLE [dbo].[Templates] (
    [Id]             INT            IDENTITY (1, 1) NOT NULL,
    [TemplateType]   NVARCHAR (50)  NOT NULL,
    [FileData]       VARCHAR (MAX)  DEFAULT (N'<!DOCTYPE html>
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
</html>') NOT NULL,
    [IsDeleted]      BIT            NULL,
    [CreateByUserID] INT            NOT NULL,
    [CreateDate]     DATETIME2 (7)  NOT NULL,
    [UpdateByUserID] INT            NULL,
    [UpdateDate]     DATETIME2 (7)  NULL,
    [templatepath]   VARCHAR (5000) NULL,
    CONSTRAINT [PK_Templates] PRIMARY KEY CLUSTERED ([Id] ASC)
);

