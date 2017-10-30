

CREATE PROC [dbo].[sp_DeletePatient]
(
    @PatientId INT, 
    @HardDelete BIT = 0
)
AS
BEGIN
    BEGIN TRANSACTION txnDELETE_Patient
    BEGIN TRY

        DECLARE @CaseId INT = 0
        DECLARE CURSOR_Case CURSOR FOR SELECT [Id] FROM [dbo].[Case] WHERE [PatientId] = @PatientId

        OPEN CURSOR_Case

        FETCH NEXT FROM CURSOR_Case INTO @CaseId
        WHILE @@FETCH_STATUS = 0 
        BEGIN                   
            EXEC sp_DeleteCase @CaseId, @HardDelete
            
            FETCH NEXT FROM CURSOR_Case INTO @CaseId
        END

        CLOSE CURSOR_Case
        DEALLOCATE CURSOR_Case

        IF (@HardDelete = 1)
        BEGIN

            DELETE FROM [dbo].[PatientInsuranceInfo] WHERE [PatientId] = @PatientId

            DELETE FROM [dbo].[PatientFamilyMembers] WHERE [PatientId] = @PatientId

            UPDATE [dbo].[Case] SET [PatientEmpInfoId] = NULL WHERE [PatientEmpInfoId] IN 
                (SELECT [Id] FROM [dbo].[PatientEmpInfo] WHERE [PatientId] = @PatientId)
            DELETE FROM [dbo].[PatientEmpInfo] WHERE [PatientId] = @PatientId

            DELETE FROM [dbo].[Patient2] WHERE [Id] = @PatientId

            DELETE FROM [dbo].[Invitation] WHERE [UserID] = @PatientId

            DELETE FROM [dbo].[UserCompany] WHERE [UserID] = @PatientId

            DELETE FROM [dbo].[UserCompanyRole] WHERE [UserID] = @PatientId

            DECLARE @COUNT_AddressInfo INT = 0
            SELECT @COUNT_AddressInfo = COUNT(*) FROM [dbo].[User] WHERE [AddressId] IN 
                (SELECT [AddressId] FROM [dbo].[User] WHERE [id] = @PatientId)
            DECLARE @AddressId INT = 0
            SELECT @AddressId = [AddressId] FROM [dbo].[User] WHERE [id] = @PatientId

            DECLARE @COUNT_ContactInfo INT = 0
            SELECT @COUNT_ContactInfo = COUNT(*) FROM [dbo].[User] WHERE [ContactInfoId] IN 
                (SELECT [ContactInfoId] FROM [dbo].[User] WHERE [id] = @PatientId)
            DECLARE @ContactInfoId INT = 0
            SELECT @ContactInfoId = [ContactInfoId] FROM [dbo].[User] WHERE [id] = @PatientId

            DELETE FROM [dbo].[User] WHERE [id] = @PatientId

            IF (@COUNT_AddressInfo = 1)
            BEGIN
                DELETE FROM [dbo].[AddressInfo] WHERE [Id] = @AddressId
            END

            IF (@COUNT_ContactInfo = 1)
            BEGIN
                DELETE FROM [dbo].[ContactInfo] WHERE [Id] = @ContactInfoId
            END
            
        END
        --ELSE
        --BEGIN
        --    --UPDATE [dbo].[PatientVisitProcedureCodes] SET [IsDeleted] = 1 WHERE [PatientVisitId] IN (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [PatientId] = @PatientId)
        --    --UPDATE [dbo].[PatientVisitDiagnosisCodes] SET [IsDeleted] = 1 WHERE [PatientVisitId] IN (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [PatientId] = @PatientId)
        --    --UPDATE [dbo].[PatientVisit2] SET [IsDeleted] = 1 WHERE [PatientId] = @PatientId
            
        --    --UPDATE [dbo].[CaseInsuranceMapping] SET [IsDeleted] = 1 WHERE [PatientInsuranceInfoId] IN (SELECT [Id] FROM [dbo].[PatientInsuranceInfo] WHERE [PatientId] = @PatientId)
        --    --UPDATE [dbo].[PatientInsuranceInfo] SET [IsDeleted] = 1 WHERE [PatientId] = @PatientId
        --    --UPDATE [dbo].[PatientFamilyMembers] SET [IsDeleted] = 1 WHERE [PatientId] = @PatientId
        --    --UPDATE [dbo].[PatientEmpInfo] SET [IsDeleted] = 1 WHERE [PatientId] = @PatientId
        --    --UPDATE [dbo].[Patient2] SET [IsDeleted] = 1 WHERE [Id] = @PatientId
        --    --UPDATE [dbo].[Patient] SET [IsDeleted] = 1 WHERE [Id] = @PatientId
        --    --UPDATE [dbo].[Invitation] SET [IsDeleted] = 1 WHERE [UserID] = @PatientId
        --    --UPDATE [dbo].[UserCompany] SET [IsDeleted] = 1 WHERE [UserID] = @PatientId
        --    --UPDATE [dbo].[UserCompanyRole] SET [IsDeleted] = 1 WHERE [UserID] = @PatientId
        --    --UPDATE [dbo].[User] SET [IsDeleted] = 1 WHERE [id] = @PatientId
        --END

    COMMIT TRANSACTION txnDELETE_Patient
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION txnDELETE_Patient
    END CATCH
END








