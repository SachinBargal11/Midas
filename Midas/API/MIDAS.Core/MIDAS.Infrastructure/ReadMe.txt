Create the Infrastructure project

In the infrastructure project, we perform operations which are related to outside the application. For example:

·         Database operations
·         Consuming web services
·         Accessing File systems

To perform the database operation we are going to use the Entity Framework Code First approach.

·         DataContext class
·         Repository class implementing Repository interface created in the core project
·         DataBaseInitalizer class

We then need to add the following references in the infrastructure project:

·         A reference of the Entity framework. To add this, right click on the project and click on manage Nuget package and then install Entity framework
·         A reference of the core project





Let us first understand why we need a Repository pattern. If you do not follow a Repository pattern and directly use the data then the following problems may arise-

·         Duplicate code
·         Difficulty implementing any data related logic or policies such that caching
·         Difficulty in unit testing the business logic without having the data access layer
·         Tightly coupled business logic and database access logic