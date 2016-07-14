In the core project you should keep the entities and the repository interfaces.

Keep in mind that the Core project should never contain any code related to database operations. Hence the following references should not be the part of the core project-

·         Reference to any external library
·         Reference to any database library
·         Reference to any ORM like LINQ to SQL, entity framework etc.

