/*
Post-Deployment Script Template                            
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.        
 Use SQLCMD syntax to include a file in the post-deployment script.            
 Example:      :r .\myfile.sql                                
 Use SQLCMD syntax to reference a variable in the post-deployment script.        
 Example:      :setvar TableName MyTable                            
               SELECT * FROM [$(TableName)]                    
--------------------------------------------------------------------------------------
*/

/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[CaseStatus] */
--REFERENCE DATA FOR [dbo].[CaseStatus]
MERGE INTO [dbo].[CaseStatus] AS Target 
    USING (VALUES 
      ('Open', 0), 
      ('Close', 0)
    ) 
AS SOURCE ([CaseStatusText], [IsDeleted])
ON TARGET.[CaseStatusText] = SOURCE.[CaseStatusText]
--UPDATE MATCHED ROWS
WHEN MATCHED THEN 
    UPDATE SET [CaseStatusText] = SOURCE.[CaseStatusText] 
--INSERT NEW ROWS
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([CaseStatusText], [IsDeleted]) 
    VALUES ([CaseStatusText], [IsDeleted]) 
--DELETE ROWS THAT ARE IN THE TARGET BUT NOT THE SOURCE
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[CaseStatus] */


/* DATABASE BACKUP AFTER PUBLISHING DATABASE */
DECLARE @DATETIMESTAMP NVARCHAR(128);
DECLARE @BACKUPPATH NVARCHAR(256);
SET @DATETIMESTAMP = FORMAT(GETDATE(), 'yyyy-MM-dd-hh.mm.ss');
SET @BACKUPPATH = 'D:\MIDAS Database\' + DB_NAME() + '-' + @DATETIMESTAMP + '-A.bak';

BACKUP DATABASE [$(DatabaseName)] TO DISK = @BACKUPPATH;
/* DATABASE BACKUP AFTER PUBLISHING DATABASE */
