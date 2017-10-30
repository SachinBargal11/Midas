
CREATE PROCEDURE [dbo].[sp_DeleteCase]
(
    @CaseId INT, 
    @HardDelete BIT = 0
)
AS
BEGIN
    DECLARE @ERROR_TABLE NVARCHAR(50) = 0

    BEGIN TRANSACTION txn_deleteCase
    BEGIN TRY

        IF (@HardDelete = 1)
        BEGIN

            SET @ERROR_TABLE = 1
            DELETE FROM [dbo].[RefferingOffice] WHERE [CaseId] = @CaseId

            SET @ERROR_TABLE = 2
            DELETE FROM [dbo].[ReferralProcedureCodes] WHERE [ReferralId] IN 
                (SELECT [Id] FROM [dbo].[Referral2] WHERE [CaseId] = @CaseId
                    OR [PendingReferralId] IN
                        (SELECT [Id] FROM [dbo].[PendingReferral] WHERE [PatientVisitId] IN 
                            (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [CaseId] = @CaseId)))

            SET @ERROR_TABLE = 3
            DELETE FROM [dbo].[ReferralDocuments] WHERE [ReferralId] IN 
                (SELECT [Id] FROM [dbo].[Referral2] WHERE [CaseId] = @CaseId
                    OR [PendingReferralId] IN
                        (SELECT [Id] FROM [dbo].[PendingReferral] WHERE [PatientVisitId] IN 
                            (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [CaseId] = @CaseId)))

            SET @ERROR_TABLE = 4
            DELETE FROM [dbo].[Referral2] WHERE [CaseId] = @CaseId
                OR [PendingReferralId] IN
                    (SELECT [Id] FROM [dbo].[PendingReferral] WHERE [PatientVisitId] IN 
                        (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [CaseId] = @CaseId))

            SET @ERROR_TABLE = 5
            DELETE FROM [dbo].[PendingReferralProcedureCodes] WHERE [PendingReferralId] IN
                (SELECT [Id] FROM [dbo].[PendingReferral] WHERE [PatientVisitId] IN 
                    (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [CaseId] = @CaseId))

            SET @ERROR_TABLE = 6
            DELETE FROM [dbo].[PendingReferral] WHERE [PatientVisitId] IN 
                (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [CaseId] = @CaseId)

            SET @ERROR_TABLE = 7
            DELETE FROM [dbo].[PatientVisitProcedureCodes] WHERE [PatientVisitId] IN 
                (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [CaseId] = @CaseId)

            SET @ERROR_TABLE = 8
            DELETE FROM [dbo].[PatientVisitDiagnosisCodes] WHERE [PatientVisitId] IN 
                (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [CaseId] = @CaseId)

            SET @ERROR_TABLE = 9
            UPDATE [dbo].[Referral2] SET [ScheduledPatientVisitId] = NULL WHERE [ScheduledPatientVisitId] IN 
                (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [CaseId] = @CaseId)
            DELETE FROM [dbo].[PatientVisit2] WHERE [CaseId] = @CaseId

            SET @ERROR_TABLE = 10
            DELETE FROM [dbo].[PatientAccidentInfo] WHERE [CaseId] = @CaseId

            SET @ERROR_TABLE = 11
            DELETE FROM [dbo].[DoctorCaseConsentApproval] WHERE [CaseId] = @CaseId

            SET @ERROR_TABLE = 12
            DELETE FROM [dbo].[CompanyCaseConsentApproval] WHERE [CaseId] = @CaseId

            SET @ERROR_TABLE = 13
            DELETE FROM [dbo].[CaseInsuranceMapping] WHERE [CaseId] = @CaseId

            SET @ERROR_TABLE = 14
            DELETE FROM [dbo].[CaseCompanyMapping] WHERE [CaseId] = @CaseId

            SET @ERROR_TABLE = 15
            DELETE FROM [dbo].[CaseCompanyConsentDocuments] WHERE [CaseId] = @CaseId

            SET @ERROR_TABLE = 16
            DELETE FROM [dbo].[Case] WHERE [Id] = @CaseId



            
            --DELETE FROM [dbo].[ReferralDocuments] WHERE [ReferralId] IN (SELECT [Id] FROM [dbo].[Referral] WHERE [CaseId] = @CaseId)
            --DELETE FROM [dbo].[Referral] WHERE [CaseId] = @CaseId
            --DELETE FROM [dbo].[PatientVisitProcedureCodes] WHERE [PatientVisitId] IN (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [CaseId] = @CaseId)
            --DELETE FROM [dbo].[PatientVisitDiagnosisCodes] WHERE [PatientVisitId] IN (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [CaseId] = @CaseId)
            --DELETE FROM [dbo].[PatientVisit2] WHERE [CaseId] = @CaseId
            --DELETE FROM [dbo].[PatientVisitEvent] WHERE [PatientVisitId] IN (SELECT [Id] FROM [dbo].[PatientVisit] WHERE [CaseId] = @CaseId)
            --DELETE FROM [dbo].[PatientVisit] WHERE [CaseId] = @CaseId
            


            
            
        END
        --ELSE
        --BEGIN
        --    --UPDATE [dbo].[RefferingOffice] SET [IsDeleted] = 1 WHERE [CaseId] = @CaseId
        --    --UPDATE [dbo].[ReferralDocuments] SET [IsDeleted] = 1 WHERE [ReferralId] IN (SELECT [Id] FROM [dbo].[Referral] WHERE [CaseId] = @CaseId)
        --    --UPDATE [dbo].[Referral] SET [IsDeleted] = 1 WHERE [CaseId] = @CaseId
        --    --UPDATE [dbo].[PatientVisitProcedureCodes] SET [IsDeleted] = 1 WHERE [PatientVisitId] IN (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [CaseId] = @CaseId)
        --    --UPDATE [dbo].[PatientVisitDiagnosisCodes] SET [IsDeleted] = 1 WHERE [PatientVisitId] IN (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [CaseId] = @CaseId)
        --    --UPDATE [dbo].[PatientVisit2] SET [IsDeleted] = 1 WHERE [CaseId] = @CaseId
        --    --UPDATE [dbo].[PatientVisitEvent] SET [IsDeleted] = 1 WHERE [PatientVisitId] IN (SELECT [Id] FROM [dbo].[PatientVisit] WHERE [CaseId] = @CaseId)
        --    --UPDATE [dbo].[PatientVisit] SET [IsDeleted] = 1 WHERE [CaseId] = @CaseId
        --    --UPDATE [dbo].[PatientAccidentInfo] SET [IsDeleted] = 1 WHERE [CaseId] = @CaseId
        --    --UPDATE [dbo].[CompanyCaseConsentApproval] SET [IsDeleted] = 1 WHERE [CaseId] = @CaseId
        --    --UPDATE [dbo].[CaseInsuranceMapping] SET [IsDeleted] = 1 WHERE [CaseId] = @CaseId
        --    --UPDATE [dbo].[CaseCompanyMapping] SET [IsDeleted] = 1 WHERE [CaseId] = @CaseId
        --    --UPDATE [dbo].[CaseCompanyConsentDocuments] SET [IsDeleted] = 1 WHERE [CaseId] = @CaseId
        --    --UPDATE [dbo].[Case] SET [IsDeleted] = 1 WHERE [Id] = @CaseId
        --END

        COMMIT TRANSACTION txn_deleteCase
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION txn_deleteCase
        RAISERROR(@ERROR_TABLE, 16, 1)
    END CATCH    
END





