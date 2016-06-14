CREATE TABLE [dbo].[Table1]
(
	[OwnerId] BIGINT NOT NULL PRIMARY KEY, 
    [Name] NVARCHAR(50) NOT NULL, 
    [AddressId] TINYINT NOT NULL, 
    [ContactInfoId] TINYINT NOT NULL, 
    CONSTRAINT [FK_Table1_ToTable] FOREIGN KEY ([Column]) REFERENCES [ToTable]([ToTableColumn])
)
