CREATE TABLE [dbo].[RoleActions]
(
	[RoleId] BINARY(50) NOT NULL ,
	[ActionId] int NOT NULL ,
	CONSTRAINT PK_RoleActions PRIMARY KEY  (RoleId,ActionId) 
)
