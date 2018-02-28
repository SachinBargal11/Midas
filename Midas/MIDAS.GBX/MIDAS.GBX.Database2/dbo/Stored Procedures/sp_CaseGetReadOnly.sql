
CREATE PROCEDURE [dbo].[sp_CaseGetReadOnly]
(
    @CaseId         INT,
    @CompanyId      INT
)
AS
BEGIN
	SET NOCOUNT ON;

    DECLARE @OriginatorCompanyId INT = NULL;
    DECLARE @OriginatorCompanyName NVARCHAR(50) = NULL;
    DECLARE @CompanyType INT = NULL;
    DECLARE @CompanyName NVARCHAR(50) = NULL;
    DECLARE @CaseSource NVARCHAR(50) = NULL;
    DECLARE @MedicalProvider NVARCHAR(50) = NULL;
    DECLARE @AttorneyProvider NVARCHAR(50) = NULL;

    SELECT TOP 1
            @OriginatorCompanyId = tblCaseCompanyMapping.[CompanyId],
            @OriginatorCompanyName = tblCompany.[Name],
            @CompanyType = tblCompany.[CompanyType],
            @MedicalProvider = (CASE WHEN tblCompany.[CompanyType] = 1 THEN tblCompany.[Name] ELSE NULL END),
            @AttorneyProvider = (CASE WHEN tblCompany.[CompanyType] = 2 THEN tblCompany.[Name] ELSE NULL END)
        FROM [dbo].[CaseCompanyMapping] tblCaseCompanyMapping
        INNER JOIN [dbo].[Company] tblCompany 
            ON tblCaseCompanyMapping.[CompanyId] = tblCompany.[id]
        WHERE tblCaseCompanyMapping.[CaseId] = @CaseId AND [IsOriginator] = 1 
            AND (tblCaseCompanyMapping.[IsDeleted] IS NULL OR tblCaseCompanyMapping.[IsDeleted] = 0)
            AND (tblCompany.[IsDeleted] IS NULL OR tblCompany.[IsDeleted] = 0);

    IF (@CompanyType = 1)
    BEGIN
        SELECT TOP 1
                @CompanyName = tblCompany.[Name], 
                @AttorneyProvider = tblCompany.[Name]
            FROM [dbo].[CaseCompanyMapping] tblCaseCompanyMapping
            INNER JOIN [dbo].[Company] tblCompany
                ON tblCaseCompanyMapping.[CompanyId] = tblCompany.[id]
                    AND tblCaseCompanyMapping.[CaseId] = @CaseId
            WHERE tblCaseCompanyMapping.[AddedByCompanyId] = @OriginatorCompanyId
                AND tblCaseCompanyMapping.[IsOriginator] = 0
                AND tblCompany.[CompanyType] = 2;
    END
    ELSE IF (@CompanyType = 2)
    BEGIN
        SELECT TOP 1
                @CompanyName = tblCompany.[Name],
                @MedicalProvider = tblCompany.[Name]
            FROM [dbo].[CaseCompanyMapping] tblCaseCompanyMapping
            INNER JOIN [dbo].[Company] tblCompany
                ON tblCaseCompanyMapping.[CompanyId] = tblCompany.[id]
                    AND tblCaseCompanyMapping.[CaseId] = @CaseId
            WHERE tblCaseCompanyMapping.[AddedByCompanyId] = @OriginatorCompanyId
                AND tblCaseCompanyMapping.[IsOriginator] = 0
                AND tblCompany.[CompanyType] = 1;
    END

    SELECT TOP 1
            @CaseSource = tblCompany.[Name]
        FROM [dbo].[CaseCompanyMapping] tblCaseCompanyMapping
        INNER JOIN [dbo].[Company] tblCompany
            ON tblCaseCompanyMapping.[AddedByCompanyId] = tblCompany.[id]
                AND tblCaseCompanyMapping.[CaseId] = @CaseId
        WHERE tblCaseCompanyMapping.[CompanyId] = @CompanyId;

    SELECT 
            [CaseId] = tblCase.Id,
            [PatientId] = tblCase.PatientId,
            [OriginatorCompanyId] = @OriginatorCompanyId,
            [OriginatorCompanyName] = @OriginatorCompanyName,
            [PatientName] = tblUser.[FirstName] + ' ' + tblUser.[MiddleName] + ' ' + tblUser.[LastName],
            [CaseTypeText] = tblCaseType.[CaseTypeText],
            [CaseStatusText] = tblCaseStatus.[CaseStatusText],
            [CarrierCaseNo] = tblCase.[CarrierCaseNo],
            [CompanyName] = @CompanyName,
            [CaseSource] = (CASE WHEN @OriginatorCompanyId = @CompanyId THEN tblCase.[CaseSource] ELSE @CaseSource END),
            [MedicalProvider] = @MedicalProvider,
            [AttorneyProvider] = @AttorneyProvider,
            [ClaimFileNumber] = tblCase.ClaimFileNumber,
            [CreateByUserID] = tblCase.CreateByUserID,
            [CreateDate] = tblCase.CreateDate,
            [UpdateByUserID] = tblCase.UpdateByUserID,
            [UpdateDate] = tblCase.UpdateDate
        FROM [dbo].[Case] tblCase
        INNER JOIN [dbo].[User] tblUser
            ON tblCase.[PatientId] = tblUser.[Id]
        INNER JOIN [dbo].[CaseType] tblCaseType
            ON tblCase.[CaseTypeId] = tblCaseType.[Id]
        INNER JOIN [dbo].[CaseStatus] tblCaseStatus
            ON tblCase.[CaseStatusId] = tblCaseStatus.[Id]
        WHERE tblCase.[Id] = @CaseId 
            AND (tblCase.[IsDeleted] IS NULL OR tblCase.[IsDeleted] = 0)
            AND (tblUser.[IsDeleted] IS NULL OR tblUser.[IsDeleted] = 0);
END
