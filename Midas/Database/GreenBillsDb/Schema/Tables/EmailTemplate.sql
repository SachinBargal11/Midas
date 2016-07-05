CREATE TABLE EmailTemplate(EmailTemplateID INT IDENTITY(1,1),
Body VARCHAR(MAX),
IsHTML BIT,
ProfileID INT,
Deleted BIT,
CreateByUserID INT,
CreatedDate DateTime,
UpdateByUserID INT,
UpdateDate DATETIME)
