using MIDAS.GBX.DataRepository.EntitySearch;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Xml;

namespace MIDAS.GBX.EntityRepository
{
    public class EntitySearch
    {
        public static string DeletedColumnName = "IsDeleted";
        public static IQueryable<U> CreateSearchQuery<U>(IQueryable<U> query, List<EntitySearchParameter> searchParameters, Dictionary<Type, string> filterMap)
        {
            query = query.Where(EntitySearch.FilterOutDeletedRecord<U>(EntitySearch.DeletedColumnName));

            foreach (EntitySearchParameter searchParameter in searchParameters.Where(i => i.type != null))
            {
                if (filterMap.ContainsKey(searchParameter.type))
                {
                    query = query.Where(EntitySearch.FilterbyIdOrName<U>(filterMap[searchParameter.type], searchParameter));
                }
                else
                {
                    throw new NotImplementedException();
                }
            }

            //Default option to order by name
            ParameterExpression param = Expression.Parameter(typeof(U));
            Expression<Func<U, String>> propExpression = Expression.Lambda<Func<U, String>>(Expression.Property(param, "Name"), param);

            query = query.OrderBy(propExpression);
            return query;
        }
        public static T ChangeType<T>(object value)
        {
            var t = typeof(T);

            if (t.IsGenericType && t.GetGenericTypeDefinition().Equals(typeof(Nullable<>)))
            {
                if (value == null)
                {
                    return default(T);
                }

                t = Nullable.GetUnderlyingType(t);
            }

            return (T)Convert.ChangeType(value, t);
        }

        public static Expression<Func<T, bool>> FilterOutDeletedRecord<T>(string deletedColumn)
        {
            ParameterExpression parameter = Expression.Parameter(typeof(T), "i");
            MemberExpression left = Expression.PropertyOrField(parameter, deletedColumn); 
            ConstantExpression right = Expression.Constant(ChangeType < T > (true));
            BinaryExpression nonDeleteExpr = Expression.NotEqual(left, right);
            return Expression.Lambda<Func<T, bool>>(nonDeleteExpr, parameter);
        }

        public static Expression<Func<T, bool>> FilterbyIdOrName<T>(string leftColumn, EntitySearchParameter searchParameter)
        {
            ParameterExpression parameter = Expression.Parameter(typeof(T), "i");
            Expression left = parameter;
            ConstantExpression right = null;

            if (!String.IsNullOrEmpty(leftColumn))
            {
                left = Expression.PropertyOrField(left, leftColumn);
            }

            MemberExpression changeOp = Expression.PropertyOrField(left, EntitySearch.DeletedColumnName);
            right = Expression.Constant(false);

            BinaryExpression nonDeleteExpr = Expression.NotEqual(changeOp, right);

            if (searchParameter.id.HasValue)
            {
                left = Expression.PropertyOrField(left, "Id");
                Object searchValue = System.Convert.ChangeType(searchParameter.id.Value, typeof(T).GetProperty("ID").PropertyType);
                right = Expression.Constant(searchValue);
                BinaryExpression idEqualExpr = Expression.Equal(left, right);
                BinaryExpression getValid = Expression.And(idEqualExpr, nonDeleteExpr);
                return Expression.Lambda<Func<T, bool>>(getValid, parameter);
            }
            else
            {
                left = Expression.PropertyOrField(left, "Name");
                Object searchValue = System.Convert.ChangeType(searchParameter.name, typeof(T).GetProperty("Name").PropertyType);
                right = Expression.Constant(searchValue);
                MethodInfo mi = typeof(string).GetMethod("Contains", new Type[] { typeof(string) });
                MethodCallExpression containsMethod = Expression.Call(left, mi, right);
                BinaryExpression getValid = Expression.And(containsMethod, nonDeleteExpr);
                return Expression.Lambda<Func<T, bool>>(getValid, parameter);
            }
        }
    }
}
