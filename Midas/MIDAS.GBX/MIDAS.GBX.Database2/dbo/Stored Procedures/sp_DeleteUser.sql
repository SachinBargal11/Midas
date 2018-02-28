

CREATE PROC [dbo].[sp_DeleteUser]
(
    @UserId INT, 
    @HardDelete BIT = 0
)
AS
BEGIN
    BEGIN TRANSACTION txnDELETE_User
    --BEGIN TRY        

        IF (@HardDelete = 1)
        BEGIN

            DELETE FROM [dbo].[UserPersonalSettings] WHERE [UserId] = @UserId

            DELETE FROM [dbo].[UserCompanyRole] WHERE [UserId] = @UserId

            DELETE FROM [dbo].[UserCompanyRole] WHERE [UserId] = @UserId        

            DELETE FROM [dbo].[Invitation] WHERE [UserID] = @UserId

            DELETE FROM [dbo].[DoctorSpecialities] WHERE [DoctorID] = @UserId

            DELETE FROM [dbo].[DoctorLocationSchedule] WHERE [DoctorID] = @UserId

            DELETE FROM [dbo].[DoctorCaseConsentApproval] WHERE [DoctorID] = @UserId

            --------------------------------------------------------------
            --DELETE FROM [dbo].[ReferralProcedureCodes] WHERE [ReferralId] IN 
            --    (SELECT [Id] FROM [dbo].[Referral2] WHERE [DoctorId] = @DoctorId
            --        OR [PendingReferralId] IN
            --            (SELECT [Id] FROM [dbo].[PendingReferral] WHERE [PatientVisitId] IN 
            --                (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [DoctorId] = @DoctorId)))

            --DELETE FROM [dbo].[ReferralDocuments] WHERE [ReferralId] IN 
            --    (SELECT [Id] FROM [dbo].[Referral2] WHERE [DoctorId] = @DoctorId
            --        OR [PendingReferralId] IN
            --            (SELECT [Id] FROM [dbo].[PendingReferral] WHERE [PatientVisitId] IN 
            --                (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [DoctorId] = @DoctorId)))

            --DELETE FROM [dbo].[Referral2] WHERE [DoctorId] = @DoctorId
            --    OR [PendingReferralId] IN
            --        (SELECT [Id] FROM [dbo].[PendingReferral] WHERE [PatientVisitId] IN 
            --            (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [DoctorId] = @DoctorId))

            --DELETE FROM [dbo].[PendingReferralProcedureCodes] WHERE [PendingReferralId] IN
            --    (SELECT [Id] FROM [dbo].[PendingReferral] WHERE [PatientVisitId] IN 
            --        (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [DoctorId] = @DoctorId))

            --DELETE FROM [dbo].[PendingReferral] WHERE [PatientVisitId] IN 
            --    (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [DoctorId] = @DoctorId)

            --DELETE FROM [dbo].[PatientVisitProcedureCodes] WHERE [PatientVisitId] IN 
            --    (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [DoctorId] = @DoctorId)

            --DELETE FROM [dbo].[PatientVisitDiagnosisCodes] WHERE [PatientVisitId] IN 
            --    (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [DoctorId] = @DoctorId)

            --UPDATE [dbo].[Referral2] SET [ScheduledPatientVisitId] = NULL WHERE [ScheduledPatientVisitId] IN 
            --    (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [DoctorId] = @DoctorId)
            --DELETE FROM [dbo].[PatientVisit2] WHERE [DoctorId] = @DoctorId
            --------------------------------------------------------------

            DELETE FROM [dbo].[Doctor] WHERE [Id] = @UserId

            DELETE FROM [dbo].[Attorney] WHERE [Id] = @UserId

            DECLARE @PatientId INT = 0
            DECLARE CURSOR_Patient CURSOR FOR SELECT [Id] FROM [dbo].[Patient2] WHERE [Id] = @UserId

            OPEN CURSOR_Patient

            FETCH NEXT FROM CURSOR_Patient INTO @PatientId
            WHILE @@FETCH_STATUS = 0 
            BEGIN                   
                EXEC sp_DeletePatient @PatientId, @HardDelete
            
                FETCH NEXT FROM CURSOR_Patient INTO @PatientId
            END

            CLOSE CURSOR_Patient
            DEALLOCATE CURSOR_Patient
        END
        
    COMMIT TRANSACTION txnDELETE_User
    --END TRY
    --BEGIN CATCH
    --    ROLLBACK TRANSACTION txnDELETE_User
    --END CATCH
END








