



CREATE PROC [dbo].[spDeletePatient]
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
               EXEC spDeleteCase @CaseId, @HardDelete
               
               FETCH NEXT FROM CURSOR_Case INTO @CaseId
          END

          CLOSE CURSOR_Case
          DEALLOCATE CURSOR_Case

          IF (@HardDelete = 1)
          BEGIN
               DELETE FROM [dbo].[PatientVisitProcedureCodes] WHERE [PatientVisitId] IN (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [PatientId] = @PatientId)
               DELETE FROM [dbo].[PatientVisitDiagnosisCodes] WHERE [PatientVisitId] IN (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [PatientId] = @PatientId)
               DELETE FROM [dbo].[PatientVisit2] WHERE [PatientId] = @PatientId

               DELETE FROM [dbo].[CaseInsuranceMapping] WHERE [PatientInsuranceInfoId] IN (SELECT [Id] FROM [dbo].[PatientInsuranceInfo] WHERE [PatientId] = @PatientId)
               DELETE FROM [dbo].[PatientInsuranceInfo] WHERE [PatientId] = @PatientId
               DELETE FROM [dbo].[PatientFamilyMembers] WHERE [PatientId] = @PatientId
               DELETE FROM [dbo].[PatientEmpInfo] WHERE [PatientId] = @PatientId
               DELETE FROM [dbo].[Patient2] WHERE [Id] = @PatientId
               DELETE FROM [dbo].[Patient] WHERE [Id] = @PatientId
               DELETE FROM [dbo].[Invitation] WHERE [UserID] = @PatientId
               DELETE FROM [dbo].[UserCompany] WHERE [UserID] = @PatientId
               DELETE FROM [dbo].[UserCompanyRole] WHERE [UserID] = @PatientId
               DELETE FROM [dbo].[User] WHERE [id] = @PatientId
          END
          ELSE
          BEGIN
               UPDATE [dbo].[PatientVisitProcedureCodes] SET [IsDeleted] = 1 WHERE [PatientVisitId] IN (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [PatientId] = @PatientId)
               UPDATE [dbo].[PatientVisitDiagnosisCodes] SET [IsDeleted] = 1 WHERE [PatientVisitId] IN (SELECT [Id] FROM [dbo].[PatientVisit2] WHERE [PatientId] = @PatientId)
               UPDATE [dbo].[PatientVisit2] SET [IsDeleted] = 1 WHERE [PatientId] = @PatientId
               
               UPDATE [dbo].[CaseInsuranceMapping] SET [IsDeleted] = 1 WHERE [PatientInsuranceInfoId] IN (SELECT [Id] FROM [dbo].[PatientInsuranceInfo] WHERE [PatientId] = @PatientId)
               UPDATE [dbo].[PatientInsuranceInfo] SET [IsDeleted] = 1 WHERE [PatientId] = @PatientId
               UPDATE [dbo].[PatientFamilyMembers] SET [IsDeleted] = 1 WHERE [PatientId] = @PatientId
               UPDATE [dbo].[PatientEmpInfo] SET [IsDeleted] = 1 WHERE [PatientId] = @PatientId
               UPDATE [dbo].[Patient2] SET [IsDeleted] = 1 WHERE [Id] = @PatientId
               UPDATE [dbo].[Patient] SET [IsDeleted] = 1 WHERE [Id] = @PatientId
               UPDATE [dbo].[Invitation] SET [IsDeleted] = 1 WHERE [UserID] = @PatientId
               UPDATE [dbo].[UserCompany] SET [IsDeleted] = 1 WHERE [UserID] = @PatientId
               UPDATE [dbo].[UserCompanyRole] SET [IsDeleted] = 1 WHERE [UserID] = @PatientId
               UPDATE [dbo].[User] SET [IsDeleted] = 1 WHERE [id] = @PatientId
          END

     COMMIT TRANSACTION txnDELETE_Patient
     END TRY
     BEGIN CATCH
          ROLLBACK TRANSACTION txnDELETE_Patient
     END CATCH
END





