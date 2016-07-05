CREATE TABLE [dbo].[ProviderMedicalOffices]
(
	[ProviderMedicalOfifceID] INT identity(1,1) NOT NULL PRIMARY KEY,
	ProviderUserID INT,
	BillingAdressID INT,
	TreatingAddressID INT,
	BillingContactInfoID INT,
	TreatingContactInfoID INT,
	IsReferring Bit,
	IsDeleted Bit,
	CreateDate DateTime,
	UpdateDate DateTime,
	CreateByUserID INT,
	UpdateByUserID INT
)
