CREATE TABLE EmailFields
(FieldID INT identity(1,1),
FieldName Varchar(50),
SQLQuery Varchar(200),
Deleted Bit,
CreateByUserID INT,
CreatedDate DateTime,
UpdateByUserID INT,
UpdateDate DateTime)

