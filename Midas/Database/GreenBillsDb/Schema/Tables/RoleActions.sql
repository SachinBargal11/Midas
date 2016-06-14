CREATE TABLE [dbo].[RoleActions]
(
	[RoleId] BINARY(50) NOT NULL ,
	[ActionId] BIGINT NOT NULL ,
	CONSTRAINT PK_RoleActions PRIMARY KEY  (RoleId,ActionId) 
)
