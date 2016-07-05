CREATE TABLE [dbo].[SignOnPdf]
(
  Id int identity(1,1),
  PdfType nvarchar(50),
  PdfSignPath nvarchar(max),
  ProviderId int,
  AccountId int
)
