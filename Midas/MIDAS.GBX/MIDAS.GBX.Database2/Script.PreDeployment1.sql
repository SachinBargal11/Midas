/*
 Pre-Deployment Script Template                            
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be executed before the build script.    
 Use SQLCMD syntax to include a file in the pre-deployment script.            
 Example:      :r .\myfile.sql                                
 Use SQLCMD syntax to reference a variable in the pre-deployment script.        
 Example:      :setvar TableName MyTable                            
               SELECT * FROM [$(TableName)]                    
--------------------------------------------------------------------------------------
*/

/* DATABASE BACKUP BEFORE PUBLISHING DATABASE */
DECLARE @DATETIMESTAMP NVARCHAR(128);
DECLARE @BACKUPPATH NVARCHAR(256);
SET @DATETIMESTAMP = FORMAT(GETDATE(), 'yyyy-MM-dd-hh.mm.ss');
SET @BACKUPPATH = 'F:\MIDAS Database\' + DB_NAME() + '-' + @DATETIMESTAMP + '-B.bak';

BACKUP DATABASE [$(DatabaseName)] TO DISK = @BACKUPPATH;
/* DATABASE BACKUP BEFORE PUBLISHING DATABASE */
