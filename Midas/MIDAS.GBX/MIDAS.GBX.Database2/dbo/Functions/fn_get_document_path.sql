
CREATE function [dbo].[fn_get_document_path]
(
	@document_node nvarchar(max)
)
returns nvarchar(max)
as
begin
	Declare @document_path nvarchar(max);

		WITH MyCTE AS (
		SELECT [ChildNode], [ParentNode],cast([NodeAbbr] as varchar(100)) as [file_path]           
		FROM DocumentNodes mn1
		WHERE [ChildNode]= @document_node
		UNION ALL 
		SELECT m2.[ChildNode], m2.[ParentNode],cast( (m2.[NodeAbbr] +'/'+ [file_path] ) as varchar(100)) as  [file_path]
		FROM DocumentNodes m2
		INNER JOIN MyCTE itms ON itms.[ParentNode] = m2.[ChildNode]
		)
		select  @document_path = [file_path] from  MyCTE where [ParentNode] is null;
	
	Return @document_path

end
