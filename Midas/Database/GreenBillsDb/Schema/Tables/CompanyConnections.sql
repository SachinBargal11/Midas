CREATE TABLE [dbo].[CompanyConnections]
(
		CompanyConnectionsid int identity (1,1),
		ConnectionFrom int,
		ConnectionTo int,
		ShowVisit bit,
		AllowCopyPatient bit,
		[Deleted] bit,
		[CreatedDate] datetime,
		[UpdatedDate] datetime,
		[CreatedBy] int,
		[UpdatedBY]  int
)
