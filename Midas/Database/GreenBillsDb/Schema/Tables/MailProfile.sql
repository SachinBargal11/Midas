CREATE TABLE [dbo].[MailProfile]
(
MailProfileID INT identity(1,1),
ProfileName varchar(20),
SMTPServer varchar(50),
SMTPPort int,
IsSSL bit,
SMTPAuthenticationRequired bit,
SMTPUser varchar(50),
SMTPPassword varchar(20),
FromEmail varchar(50),
[Deleted] bit,
[CreatedDate] datetime,
[UpdatedDate] datetime,
[CreatedBy] int,
[UpdatedBY]  int,
IPAddress varchar(15)
)
