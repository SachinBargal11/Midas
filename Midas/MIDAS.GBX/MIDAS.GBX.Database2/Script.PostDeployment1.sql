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

/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[CaseType] */
--REFERENCE DATA FOR [dbo].[CaseType]
MERGE INTO [dbo].[CaseType] AS Target 
    USING (VALUES 
      ('Nofault', 0, '', 0), 
      ('WC', 0, '', 0), 
      ('Private', 0, '', 0), 
      ('Lien', 0, '', 0)
    ) 
AS SOURCE ([CaseTypeText], [IsDeleted], [AbbreviationCode], [IsInclude1500])
ON TARGET.[CaseTypeText] = SOURCE.[CaseTypeText]
--UPDATE MATCHED ROWS
WHEN MATCHED THEN 
    UPDATE SET [CaseTypeText] = SOURCE.[CaseTypeText] 
--INSERT NEW ROWS
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([CaseTypeText], [IsDeleted], [AbbreviationCode], [IsInclude1500]) 
    VALUES ([CaseTypeText], [IsDeleted], [AbbreviationCode], [IsInclude1500]) 
--DELETE ROWS THAT ARE IN THE TARGET BUT NOT THE SOURCE
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[CaseType] */

/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[CompanyStatusType] */
--REFERENCE DATA FOR [dbo].[CompanyStatusType]
MERGE INTO [dbo].[CompanyStatusType] AS Target 
    USING (VALUES 
      ('RegistratioInComplete', 0), 
      ('RegistrationComplete', 0), 
      ('Active', 0), 
      ('Deleted', 0)
    ) 
AS SOURCE ([Name], [IsDeleted])
ON TARGET.[Name] = SOURCE.[Name]
--UPDATE MATCHED ROWS
WHEN MATCHED THEN 
    UPDATE SET [Name] = SOURCE.[Name] 
--INSERT NEW ROWS
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([Name], [IsDeleted]) 
    VALUES ([Name], [IsDeleted]) 
--DELETE ROWS THAT ARE IN THE TARGET BUT NOT THE SOURCE
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[CompanyStatusType] */

/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[CompanyType] */
--REFERENCE DATA FOR [dbo].[CompanyType]
MERGE INTO [dbo].[CompanyType] AS Target 
    USING (VALUES 
      ('Billing', 0, 0, GETDATE()), 
      ('Attorney', 0, 0, GETDATE()), 
      ('Billing', 0, 0, GETDATE()), 
      ('Funding', 0, 0, GETDATE()), 
      ('Collection', 0, 0, GETDATE()), 
      ('Anicliary', 0, 0, GETDATE()), 
      ('Testing', 0, 0, GETDATE())
    ) 
AS SOURCE ([Name], [IsDeleted], [CreateByUserID], [CreateDate])
ON TARGET.[Name] = SOURCE.[Name]
--UPDATE MATCHED ROWS
WHEN MATCHED THEN 
    UPDATE SET [Name] = SOURCE.[Name] 
--INSERT NEW ROWS
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([Name], [IsDeleted], [CreateByUserID], [CreateDate]) 
    VALUES ([Name], [IsDeleted], [CreateByUserID], [CreateDate]) 
--DELETE ROWS THAT ARE IN THE TARGET BUT NOT THE SOURCE
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[CompanyType] */

/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[ConsentGivenType] */
--REFERENCE DATA FOR [dbo].[ConsentGivenType]
MERGE INTO [dbo].[ConsentGivenType] AS Target 
    USING (VALUES 
      ('Uploaded'), 
      ('Scanned'), 
      ('Digitally Signed'), 
      ('Accepted from patient portal')
    ) 
AS SOURCE ([TypeText])
ON TARGET.[TypeText] = SOURCE.[TypeText]
--UPDATE MATCHED ROWS
WHEN MATCHED THEN 
    UPDATE SET [TypeText] = SOURCE.[TypeText] 
--INSERT NEW ROWS
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([TypeText]) 
    VALUES ([TypeText]) 
--DELETE ROWS THAT ARE IN THE TARGET BUT NOT THE SOURCE
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[ConsentGivenType] */

/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[DiagnosisType] */
--REFERENCE DATA FOR [dbo].[DiagnosisType]
MERGE INTO [dbo].[DiagnosisType] AS Target 
    USING (VALUES 
      ('Ankle1', 0, 0, GETDATE(), 1), 
      ('Arm', 0, 0, GETDATE(), 1), 
      ('Cervical', 0, 0, GETDATE(), 1), 
      ('Chest', 0, 0, GETDATE(), 1), 
      ('Contusion', 0, 0, GETDATE(), 1), 
      ('Depression', 0, 0, GETDATE(), 1), 
      ('Dysfunction', 0, 0, GETDATE(), 1), 
      ('Elbow', 0, 0, GETDATE(), 1), 
      ('Extremity', 0, 0, GETDATE(), 1), 
      ('Face/ Eye/Ea', 0, 0, GETDATE(), 1), 
      ('Finger', 0, 0, GETDATE(), 1), 
      ('Foot', 0, 0, GETDATE(), 1), 
      ('Forearm', 0, 0, GETDATE(), 1), 
      ('Fracture', 0, 0, GETDATE(), 1), 
      ('Hand', 0, 0, GETDATE(), 1), 
      ('Head', 0, 0, GETDATE(), 1), 
      ('Hearing', 0, 0, GETDATE(), 1), 
      ('Hip', 0, 0, GETDATE(), 1), 
      ('Jaw', 0, 0, GETDATE(), 1), 
      ('Knee', 0, 0, GETDATE(), 1), 
      ('Leg', 0, 0, GETDATE(), 1), 
      ('Low Back', 0, 0, GETDATE(), 1), 
      ('Lumbar', 0, 0, GETDATE(), 1), 
      ('Medial', 0, 0, GETDATE(), 1), 
      ('Mental', 0, 0, GETDATE(), 1), 
      ('Muscle', 0, 0, GETDATE(), 1), 
      ('Neck', 0, 0, GETDATE(), 1), 
      ('Nose', 0, 0, GETDATE(), 1), 
      ('Other', 0, 0, GETDATE(), 1), 
      ('Otitis', 0, 0, GETDATE(), 1), 
      ('Pelvis', 0, 0, GETDATE(), 1), 
      ('Rib', 0, 0, GETDATE(), 1), 
      ('Sacral', 0, 0, GETDATE(), 1), 
      ('Sacrum', 0, 0, GETDATE(), 1), 
      ('Shoulder', 0, 0, GETDATE(), 1), 
      ('Stomach', 0, 0, GETDATE(), 1), 
      ('Stress', 0, 0, GETDATE(), 1), 
      ('Syndrome', 0, 0, GETDATE(), 1), 
      ('Thigh', 0, 0, GETDATE(), 1), 
      ('Thoracic', 0, 0, GETDATE(), 1), 
      ('Throat', 0, 0, GETDATE(), 1), 
      ('TMJ', 0, 0, GETDATE(), 1), 
      ('Toe', 0, 0, GETDATE(), 1), 
      ('Visual', 0, 0, GETDATE(), 1), 
      ('Walking', 0, 0, GETDATE(), 1), 
      ('Wrist', 0, 0, GETDATE(), 1), 
      ('Well Visit', 0, 0, GETDATE(), 1), 
      ('AC', 0, 0, GETDATE(), 1), 
      ('Back', 0, 0, GETDATE(), 1), 
      ('Brain', 0, 0, GETDATE(), 1), 
      ('Calf', 0, 0, GETDATE(), 1), 
      ('EMG-FAV', 0, 0, GETDATE(), 1), 
      ('Face/ Eye/Ears', 0, 0, GETDATE(), 1), 
      ('Femur', 0, 0, GETDATE(), 1), 
      ('Jocelyn DCODES', 0, 0, GETDATE(), 1), 
      ('LOWER LEG', 0, 0, GETDATE(), 1), 
      ('MANDIBLE', 0, 0, GETDATE(), 1), 
      ('NASAL BONES', 0, 0, GETDATE(), 1), 
      ('Orbits', 0, 0, GETDATE(), 1), 
      ('roman', 0, 0, GETDATE(), 1), 
      ('Sinus', 0, 0, GETDATE(), 1), 
      ('STERNUM', 0, 0, GETDATE(), 1), 
      ('Tibia', 0, 0, GETDATE(), 1), 
      ('Clavicle', 0, 0, GETDATE(), 1)
    ) 
AS SOURCE ([DiagnosisTypeText], [IsDeleted], [CreateByUserID], [CreateDate], [ICDTypeCodeID])
ON TARGET.[DiagnosisTypeText] = SOURCE.[DiagnosisTypeText]
--UPDATE MATCHED ROWS
WHEN MATCHED THEN 
    UPDATE SET [DiagnosisTypeText] = SOURCE.[DiagnosisTypeText] 
--INSERT NEW ROWS
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([DiagnosisTypeText], [IsDeleted], [CreateByUserID], [CreateDate], [ICDTypeCodeID]) 
    VALUES ([DiagnosisTypeText], [IsDeleted], [CreateByUserID], [CreateDate], [ICDTypeCodeID]) 
--DELETE ROWS THAT ARE IN THE TARGET BUT NOT THE SOURCE
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[DiagnosisType] */

/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[DoctorTaxType] */
--REFERENCE DATA FOR [dbo].[DoctorTaxType]
MERGE INTO [dbo].[DoctorTaxType] AS Target 
    USING (VALUES 
      ('TAX 1', 0, 1, GETDATE()), 
      ('TAX 2', 0, 1, GETDATE())
    ) 
AS SOURCE ([Name], [IsDeleted], [CreateByUserID], [CreateDate])
ON TARGET.[Name] = SOURCE.[Name]
--UPDATE MATCHED ROWS
WHEN MATCHED THEN 
    UPDATE SET [Name] = SOURCE.[Name] 
--INSERT NEW ROWS
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([Name], [IsDeleted], [CreateByUserID], [CreateDate]) 
    VALUES ([Name], [IsDeleted], [CreateByUserID], [CreateDate]) 
--DELETE ROWS THAT ARE IN THE TARGET BUT NOT THE SOURCE
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[DoctorTaxType] */

/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[Gender] */
--REFERENCE DATA FOR [dbo].[Gender]
MERGE INTO [dbo].[Gender] AS Target 
    USING (VALUES 
      ('Male', 0), 
      ('Female', 0)
    ) 
AS SOURCE ([GenderText], [IsDeleted])
ON TARGET.[GenderText] = SOURCE.[GenderText]
--UPDATE MATCHED ROWS
WHEN MATCHED THEN 
    UPDATE SET [GenderText] = SOURCE.[GenderText] 
--INSERT NEW ROWS
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([GenderText], [IsDeleted]) 
    VALUES ([GenderText], [IsDeleted]) 
--DELETE ROWS THAT ARE IN THE TARGET BUT NOT THE SOURCE
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[Gender] */

/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[ICDTypeCode] */
--REFERENCE DATA FOR [dbo].[ICDTypeCode]
MERGE INTO [dbo].[ICDTypeCode] AS Target 
    USING (VALUES 
      ('ICD9', 0, 1, GETDATE()), 
      ('ICD10', 0, 1, GETDATE())
    ) 
AS SOURCE ([Code], [IsDeleted], [CreatedByUserID], [CreateDate])
ON TARGET.[Code] = SOURCE.[GenderText]
--UPDATE MATCHED ROWS
WHEN MATCHED THEN 
    UPDATE SET [Code] = SOURCE.[Code] 
--INSERT NEW ROWS
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([Code], [IsDeleted], [CreatedByUserID], [CreateDate]) 
    VALUES ([Code], [IsDeleted], [CreatedByUserID], [CreateDate]) 
--DELETE ROWS THAT ARE IN THE TARGET BUT NOT THE SOURCE
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[ICDTypeCode] */

/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[InsuranceType] */
--REFERENCE DATA FOR [dbo].[InsuranceType]
MERGE INTO [dbo].[InsuranceType] AS Target 
    USING (VALUES 
      ('Primary', 0), 
      ('Secondary', 0), 
      ('Major Medical', 0), 
      ('Private', 0)
    ) 
AS SOURCE ([InsuranceTypeText], [IsDeleted])
ON TARGET.[InsuranceTypeText] = SOURCE.[InsuranceTypeText]
--UPDATE MATCHED ROWS
WHEN MATCHED THEN 
    UPDATE SET [InsuranceTypeText] = SOURCE.[InsuranceTypeText] 
--INSERT NEW ROWS
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([InsuranceTypeText], [IsDeleted]) 
    VALUES ([InsuranceTypeText], [IsDeleted]) 
--DELETE ROWS THAT ARE IN THE TARGET BUT NOT THE SOURCE
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[InsuranceType] */

/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[MaritalStatus] */
--REFERENCE DATA FOR [dbo].[MaritalStatus]
MERGE INTO [dbo].[MaritalStatus] AS Target 
    USING (VALUES 
      ('single', 0), 
      ('married', 0)
    ) 
AS SOURCE ([StatusText], [IsDeleted])
ON TARGET.[StatusText] = SOURCE.[StatusText]
--UPDATE MATCHED ROWS
WHEN MATCHED THEN 
    UPDATE SET [StatusText] = SOURCE.[StatusText] 
--INSERT NEW ROWS
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([StatusText], [IsDeleted]) 
    VALUES ([StatusText], [IsDeleted]) 
--DELETE ROWS THAT ARE IN THE TARGET BUT NOT THE SOURCE
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[MaritalStatus] */

/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[PatientType] */
--REFERENCE DATA FOR [dbo].[PatientType]
MERGE INTO [dbo].[PatientType] AS Target 
    USING (VALUES 
      ('Bicyclist', 0), 
      ('Driver', 0), 
      ('Passenger', 0), 
      ('Pedestrain', 0), 
      ('OD', 0)
    ) 
AS SOURCE ([PatientTypeText], [IsDeleted])
ON TARGET.[PatientTypeText] = SOURCE.[PatientTypeText]
--UPDATE MATCHED ROWS
WHEN MATCHED THEN 
    UPDATE SET [PatientTypeText] = SOURCE.[PatientTypeText] 
--INSERT NEW ROWS
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([PatientTypeText], [IsDeleted]) 
    VALUES ([PatientTypeText], [IsDeleted]) 
--DELETE ROWS THAT ARE IN THE TARGET BUT NOT THE SOURCE
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[PatientType] */

/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[PolicyOwner] */
--REFERENCE DATA FOR [dbo].[PolicyOwner]
MERGE INTO [dbo].[PolicyOwner] AS Target 
    USING (VALUES 
      ('Self', 0), 
      ('Spous', 0), 
      ('Child', 0), 
      ('Other', 0)
    ) 
AS SOURCE ([DisplayText], [IsDeleted])
ON TARGET.[DisplayText] = SOURCE.[DisplayText]
--UPDATE MATCHED ROWS
WHEN MATCHED THEN 
    UPDATE SET [DisplayText] = SOURCE.[DisplayText] 
--INSERT NEW ROWS
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([DisplayText], [IsDeleted]) 
    VALUES ([DisplayText], [IsDeleted]) 
--DELETE ROWS THAT ARE IN THE TARGET BUT NOT THE SOURCE
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[PolicyOwner] */

/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[PreferredUIView] */
--REFERENCE DATA FOR [dbo].[PreferredUIView]
MERGE INTO [dbo].[PreferredUIView] AS Target 
    USING (VALUES 
      ('Tab View', 0, 1, GETDATE()), 
      ('Collapsable Panel View', 0, 1, GETDATE())
    ) 
AS SOURCE ([PreferredUIViewText], [IsDeleted], [CreateByUserID], [CreateDate])
ON TARGET.[PreferredUIViewText] = SOURCE.[PreferredUIViewText]
--UPDATE MATCHED ROWS
WHEN MATCHED THEN 
    UPDATE SET [PreferredUIViewText] = SOURCE.[PreferredUIViewText] 
--INSERT NEW ROWS
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([PreferredUIViewText], [IsDeleted], [CreateByUserID], [CreateDate]) 
    VALUES ([PreferredUIViewText], [IsDeleted], [CreateByUserID], [CreateDate]) 
--DELETE ROWS THAT ARE IN THE TARGET BUT NOT THE SOURCE
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[PreferredUIView] */

/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[Relations] */
--REFERENCE DATA FOR [dbo].[Relations]
MERGE INTO [dbo].[Relations] AS Target 
    USING (VALUES 
      ('Father', 0), 
      ('Mother', 0), 
      ('Sibling', 0), 
      ('Spouse', 0), 
      ('Child', 0)
    ) 
AS SOURCE ([RelationText], [IsDeleted])
ON TARGET.[RelationText] = SOURCE.[RelationText]
--UPDATE MATCHED ROWS
WHEN MATCHED THEN 
    UPDATE SET [RelationText] = SOURCE.[RelationText] 
--INSERT NEW ROWS
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([RelationText], [IsDeleted]) 
    VALUES ([RelationText], [IsDeleted]) 
--DELETE ROWS THAT ARE IN THE TARGET BUT NOT THE SOURCE
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[Relations] */

/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[RoomTest] */
--REFERENCE DATA FOR [dbo].[RoomTest]
MERGE INTO [dbo].[RoomTest] AS Target 
    USING (VALUES 
      ('MRI', 0, 1, GETDATE(), '#FF00FF'), 
      ('CT-Scan', 0, 1, GETDATE(), '#FF00FA'), 
      ('X-RAY', 0, 1, GETDATE(), '#FF00F0'), 
      ('ECG', 0, 1, GETDATE(), '#FA00FF'), 
      ('EMG', 0, 1, GETDATE(), '#FA00FF')
    ) 
AS SOURCE ([Name], [IsDeleted], [CreateByUserID], [CreateDate], [ColorCode])
ON TARGET.[Name] = SOURCE.[Name]
--UPDATE MATCHED ROWS
WHEN MATCHED THEN 
    UPDATE SET [Name] = SOURCE.[Name] 
--INSERT NEW ROWS
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([Name], [IsDeleted], [CreateByUserID], [CreateDate], [ColorCode]) 
    VALUES ([Name], [IsDeleted], [CreateByUserID], [CreateDate], [ColorCode]) 
--DELETE ROWS THAT ARE IN THE TARGET BUT NOT THE SOURCE
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[RoomTest] */

/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[SubscriptionPlan] */
--REFERENCE DATA FOR [dbo].[SubscriptionPlan]
MERGE INTO [dbo].[SubscriptionPlan] AS Target 
    USING (VALUES 
      ('Trial', 0, 0, GETDATE()), 
      ('Pro', 0, 0, GETDATE())
    ) 
AS SOURCE ([Name], [IsDeleted], [CreateByUserID], [CreateDate])
ON TARGET.[Name] = SOURCE.[Name]
--UPDATE MATCHED ROWS
WHEN MATCHED THEN 
    UPDATE SET [Name] = SOURCE.[Name] 
--INSERT NEW ROWS
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([Name], [IsDeleted], [CreateByUserID], [CreateDate]) 
    VALUES ([Name], [IsDeleted], [CreateByUserID], [CreateDate]) 
--DELETE ROWS THAT ARE IN THE TARGET BUT NOT THE SOURCE
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[SubscriptionPlan] */

/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[UserType] */
--REFERENCE DATA FOR [dbo].[UserType]
MERGE INTO [dbo].[UserType] AS Target 
    USING (VALUES 
      ('Patient', 0, 0, GETDATE()), 
      ('Staff', 0, 0, GETDATE()), 
      ('Attorney', 0, 0, GETDATE()), 
      ('Doctor', 0, 0, GETDATE()), 
      ('Ancillary', 0, 0, GETDATE())
    ) 
AS SOURCE ([Name], [IsDeleted], [CreateByUserID], [CreateDate])
ON TARGET.[Name] = SOURCE.[Name]
--UPDATE MATCHED ROWS
WHEN MATCHED THEN 
    UPDATE SET [Name] = SOURCE.[Name] 
--INSERT NEW ROWS
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([Name], [IsDeleted], [CreateByUserID], [CreateDate]) 
    VALUES ([Name], [IsDeleted], [CreateByUserID], [CreateDate]) 
--DELETE ROWS THAT ARE IN THE TARGET BUT NOT THE SOURCE
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[UserType] */

/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[VisitCategory] */
--REFERENCE DATA FOR [dbo].[VisitCategory]
MERGE INTO [dbo].[VisitCategory] AS Target 
    USING (VALUES 
      ('Patient Visit', 0), 
      ('IME Visit', 0), 
      ('EO Visit', 0)
    ) 
AS SOURCE ([NAME], [IsDeleted])
ON TARGET.[NAME] = SOURCE.[NAME]
--UPDATE MATCHED ROWS
WHEN MATCHED THEN 
    UPDATE SET [NAME] = SOURCE.[NAME] 
--INSERT NEW ROWS
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([NAME], [IsDeleted]) 
    VALUES ([NAME], [IsDeleted]) 
--DELETE ROWS THAT ARE IN THE TARGET BUT NOT THE SOURCE
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[VisitCategory] */

/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[VisitStatus] */
--REFERENCE DATA FOR [dbo].[VisitStatus]
MERGE INTO [dbo].[VisitStatus] AS Target 
    USING (VALUES 
      ('SCHEDULED', 0), 
      ('COMPLETE', 0), 
      ('RESCHEDULE', 0), 
      ('NOSHOW', 0)
    ) 
AS SOURCE ([NAME], [IsDeleted])
ON TARGET.[NAME] = SOURCE.[NAME]
--UPDATE MATCHED ROWS
WHEN MATCHED THEN 
    UPDATE SET [NAME] = SOURCE.[NAME] 
--INSERT NEW ROWS
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([NAME], [IsDeleted]) 
    VALUES ([NAME], [IsDeleted]) 
--DELETE ROWS THAT ARE IN THE TARGET BUT NOT THE SOURCE
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[VisitStatus] */

/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[VisitType] */
--REFERENCE DATA FOR [dbo].[VisitType]
MERGE INTO [dbo].[VisitType] AS Target 
    USING (VALUES 
      ('IN', 'Initial',  0, 1, GETDATE()), 
      ('FL', 'Follow Up', 0, 1, GETDATE()), 
      ('RE', 'Re-eval', 0, 1, GETDATE())
    ) 
AS SOURCE ([Name], [Description], [IsDeleted], [CreateByUserID], [CreateDate])
ON TARGET.[Name] = SOURCE.[Name]
--UPDATE MATCHED ROWS
WHEN MATCHED THEN 
    UPDATE SET [Name] = SOURCE.[Name] 
--INSERT NEW ROWS
WHEN NOT MATCHED BY TARGET THEN 
INSERT ([Name],[Description], [IsDeleted], [CreateByUserID], [CreateDate]) 
    VALUES ([Name],[Description], [IsDeleted], [CreateByUserID], [CreateDate]) 
--DELETE ROWS THAT ARE IN THE TARGET BUT NOT THE SOURCE
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
/* LOOK UP/DEPLOY DATA FOR TABLE [dbo].[VisitType] */



















/* DATABASE BACKUP AFTER PUBLISHING DATABASE */
DECLARE @DATETIMESTAMP NVARCHAR(128);
DECLARE @BACKUPPATH NVARCHAR(256);
SET @DATETIMESTAMP = FORMAT(GETDATE(), 'yyyy-MM-dd-hh.mm.ss');
SET @BACKUPPATH = 'D:\MIDAS Database\' + DB_NAME() + '-' + @DATETIMESTAMP + '-A.bak';

BACKUP DATABASE [$(DatabaseName)] TO DISK = @BACKUPPATH;
/* DATABASE BACKUP AFTER PUBLISHING DATABASE */
