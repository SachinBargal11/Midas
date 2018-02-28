

CREATE PROCEDURE [dbo].[spDeleteCase]
(
     @CaseId INT, 
     @HardDelete BIT = 0
)
AS
BEGIN
     BEGIN TRANSACTION txn_deleteCase
     BEGIN TRY

          IF (@HardDelete = 1)
          BEGIN
               DELETE FROM [dbo].[RefferingOffice] WHERE [CaseId] = @CaseId
               DELETE FROM [dbo].[ReferralDocuments] WHERE [ReferralId] IN (SELECT [Id] FROM [dbo].[Referral] WHERE [CaseId] = @CaseId)
               DELETE FROM [dbo].[Referral] WHERE [CaseId] = @CaseId
               DELETE FROM [dbo].[PatientVisitProcedureCodes] WHERE [PatientVisitId] IN (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [CaseId] = @CaseId)
               DELETE FROM [dbo].[PatientVisitDiagnosisCodes] WHERE [PatientVisitId] IN (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [CaseId] = @CaseId)
               DELETE FROM [dbo].[PatientVisit2] WHERE [CaseId] = @CaseId
               DELETE FROM [dbo].[PatientVisitEvent] WHERE [PatientVisitId] IN (SELECT [Id] FROM [dbo].[PatientVisit] WHERE [CaseId] = @CaseId)
               DELETE FROM [dbo].[PatientVisit] WHERE [CaseId] = @CaseId
               DELETE FROM [dbo].[PatientAccidentInfo] WHERE [CaseId] = @CaseId
               DELETE FROM [dbo].[CompanyCaseConsentApproval] WHERE [CaseId] = @CaseId
               DELETE FROM [dbo].[CaseInsuranceMapping] WHERE [CaseId] = @CaseId
               DELETE FROM [dbo].[CaseCompanyMapping] WHERE [CaseId] = @CaseId
               DELETE FROM [dbo].[CaseCompanyConsentDocuments] WHERE [CaseId] = @CaseId
               DELETE FROM [dbo].[Case] WHERE [Id] = @CaseId
          END
          ELSE
          BEGIN
               UPDATE [dbo].[RefferingOffice] SET [IsDeleted] = 1 WHERE [CaseId] = @CaseId
               UPDATE [dbo].[ReferralDocuments] SET [IsDeleted] = 1 WHERE [ReferralId] IN (SELECT [Id] FROM [dbo].[Referral] WHERE [CaseId] = @CaseId)
               UPDATE [dbo].[Referral] SET [IsDeleted] = 1 WHERE [CaseId] = @CaseId
               UPDATE [dbo].[PatientVisitProcedureCodes] SET [IsDeleted] = 1 WHERE [PatientVisitId] IN (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [CaseId] = @CaseId)
               UPDATE [dbo].[PatientVisitDiagnosisCodes] SET [IsDeleted] = 1 WHERE [PatientVisitId] IN (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [CaseId] = @CaseId)
               UPDATE [dbo].[PatientVisit2] SET [IsDeleted] = 1 WHERE [CaseId] = @CaseId
               UPDATE [dbo].[PatientVisitEvent] SET [IsDeleted] = 1 WHERE [PatientVisitId] IN (SELECT [Id] FROM [dbo].[PatientVisit] WHERE [CaseId] = @CaseId)
               UPDATE [dbo].[PatientVisit] SET [IsDeleted] = 1 WHERE [CaseId] = @CaseId
               UPDATE [dbo].[PatientAccidentInfo] SET [IsDeleted] = 1 WHERE [CaseId] = @CaseId
               UPDATE [dbo].[CompanyCaseConsentApproval] SET [IsDeleted] = 1 WHERE [CaseId] = @CaseId
               UPDATE [dbo].[CaseInsuranceMapping] SET [IsDeleted] = 1 WHERE [CaseId] = @CaseId
               UPDATE [dbo].[CaseCompanyMapping] SET [IsDeleted] = 1 WHERE [CaseId] = @CaseId
               UPDATE [dbo].[CaseCompanyConsentDocuments] SET [IsDeleted] = 1 WHERE [CaseId] = @CaseId
               UPDATE [dbo].[Case] SET [IsDeleted] = 1 WHERE [Id] = @CaseId
          END

          COMMIT TRANSACTION txn_deleteCase
     END TRY
     BEGIN CATCH
          ROLLBACK TRANSACTION txn_deleteCase
     END CATCH     
END


