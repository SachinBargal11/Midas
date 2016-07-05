CREATE TABLE EmailProfile
(EmailProfileID INT IDENTITY(1,1),
ProfileName VARCHAR(20),
SMTPServer VARCHAR(50),
SMTPPort INT,
SSLEnabled BIT,
Deleted BIT,
CreateByUserID INT,
CreatedDate DateTime,
UpdateByUserID INT,
UpdateDate DATETIME)
