
CREATE PROCEDURE [dbo].[midas_sp_get_document_path] --'AC-AC'
(
	@document_node nvarchar(max)
)
as
begin
	--declare @documentdestination nvarchar(max)
	select [dbo].[fn_get_document_path](@document_node)
	
end;

