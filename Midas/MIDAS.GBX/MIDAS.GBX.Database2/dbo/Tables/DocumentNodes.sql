CREATE TABLE [dbo].[DocumentNodes] (
    [id]         INT           IDENTITY (1, 1) NOT NULL,
    [ParentNode] NVARCHAR (10) NULL,
    [ChildNode]  NVARCHAR (50) NOT NULL,
    [NodeAbbr]   VARCHAR (10)  NULL
);

