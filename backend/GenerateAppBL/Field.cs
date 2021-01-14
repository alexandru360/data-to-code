using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Configuration;
using System.Diagnostics;

namespace GenerateApp.Controllers
{
    public class Relations
    {
        public string Name { get; set; }
        public string TableParentId { get; set; }
        public string FieldParentId { get; set; }
        public string TableRefID { get; set; }
        public string FieldRefId { get; set; }

    }
    public class Field:IValidatableObject
    {

        public Field()
        {
            IsNullable = false;
        }
        public string ID { get; set; }
        public string name { get; set; }
        public string type
        {
            get
            {
                return generateType();
            }
        }
        public bool IsPK { get; set; }
        private string generateType() =>
            originalType?.ToLower() switch
            {
                null => "does not exist ",
                string s when s.Contains("int",StringComparison.InvariantCultureIgnoreCase) => "number",
                string s when s.Contains("double", StringComparison.InvariantCultureIgnoreCase) => "number",
                
                string s when s.Contains("varchar", StringComparison.InvariantCultureIgnoreCase) => "string",
                string s when s.Contains("text", StringComparison.InvariantCultureIgnoreCase) => "string",
                string s when s.Contains("mediumtext", StringComparison.InvariantCultureIgnoreCase) => "string",
                string s when s.Contains("bool", StringComparison.InvariantCultureIgnoreCase) => "boolean",
                string s when s.Contains("bit", StringComparison.InvariantCultureIgnoreCase) => "boolean",
                string s when s.Contains("date", StringComparison.InvariantCultureIgnoreCase) => "date",
                string s when s.Contains("varbinary", StringComparison.InvariantCultureIgnoreCase) => "byte[]",
                string s when s.Contains("blob", StringComparison.InvariantCultureIgnoreCase) => "byte[]",
                string s when s.Contains("timestamp", StringComparison.InvariantCultureIgnoreCase) => "date",
                string s when s.Contains("decimal", StringComparison.InvariantCultureIgnoreCase) => "number",
                string s when s.Contains("money", StringComparison.InvariantCultureIgnoreCase) => "number",
                string s when s.Contains("char", StringComparison.InvariantCultureIgnoreCase) => "string",
                string s when s.Contains("uniqueidentifier", StringComparison.InvariantCultureIgnoreCase) => "string",
                _ => notFoundType(originalType)
            };
        private string notFoundType(string t)
        {
            Debug.Assert(false, $"cannot find type {t}");
            return $"not found {t}";
        }
        //public Type DotNetType()
        //{
        //    var t = DotNetTypeOriginal();
        //    if (!IsNullable)
        //        return t;
        //    if (t.FullName == typeof(string).FullName)
        //        return t;
        //    if (!t.IsValueType)
        //        return t;
        //    return typeof(Nullable<>).MakeGenericType(t);
        //}
        public Type DotNetType(connTypes connectionTypes) =>
            originalType?.ToLower() switch
            {
                null => null,
                string s when s.Contains("bit", StringComparison.InvariantCultureIgnoreCase) => typeof(bool),
                string s when s.Contains("bigint", StringComparison.InvariantCultureIgnoreCase) => typeof(long),
                string s when s.Contains("decimal", StringComparison.InvariantCultureIgnoreCase) => typeof(decimal),
                string s when s.Contains("numeric", StringComparison.InvariantCultureIgnoreCase) => typeof(decimal),
                string s when s.Contains("money", StringComparison.InvariantCultureIgnoreCase) => typeof(decimal),
                string s when s.Contains("float", StringComparison.InvariantCultureIgnoreCase) => typeof(double),
                string s when s.Contains("real", StringComparison.InvariantCultureIgnoreCase) => typeof(Single),
                string s when connTypes.MSSQL == connectionTypes &&  s.Contains("timestamp", StringComparison.InvariantCultureIgnoreCase) => typeof(byte[]),
                string s when connTypes.MariaDB == connectionTypes && s.Contains("timestamp", StringComparison.InvariantCultureIgnoreCase) => typeof(DateTime),
                string s when connTypes.MYSQL == connectionTypes && s.Contains("timestamp", StringComparison.InvariantCultureIgnoreCase) => typeof(DateTime),

                string s when s.Contains("time", StringComparison.InvariantCultureIgnoreCase) => typeof(DateTime),

                string s when s.Contains("uniqueidentifier", StringComparison.InvariantCultureIgnoreCase) => typeof(Guid),
                string s when s.Contains("smallint", StringComparison.InvariantCultureIgnoreCase) => typeof(Int16),
                string s when s.Contains("tinyint", StringComparison.InvariantCultureIgnoreCase) => typeof(byte),

                string s when s.Contains("int", StringComparison.InvariantCultureIgnoreCase) => typeof(int),
                string s when s.Contains("varchar", StringComparison.InvariantCultureIgnoreCase) => typeof(string),
                string s when s.Contains("sql_variant", StringComparison.InvariantCultureIgnoreCase) => typeof(string),
                string s when s.Contains("char", StringComparison.InvariantCultureIgnoreCase) => typeof(string),
                string s when connTypes.MariaDB == connectionTypes  && s.Contains("varbinary") => typeof(byte[]),
                string s when connTypes.MYSQL == connectionTypes && s.Contains("varbinary") => typeof(byte[]),
                string s when s.Contains("binary", StringComparison.InvariantCultureIgnoreCase) => typeof(string),
                string s when s.Contains("text", StringComparison.InvariantCultureIgnoreCase) => typeof(string),
                string s when s.Contains("xml", StringComparison.InvariantCultureIgnoreCase) => typeof(string),
                string s when s.Contains("image", StringComparison.InvariantCultureIgnoreCase) => typeof(byte[]),

                string s when s.Contains("bool", StringComparison.InvariantCultureIgnoreCase) => typeof(bool),
                string s when s.Contains("date", StringComparison.InvariantCultureIgnoreCase) => typeof(DateTime),
                string s when s.Contains("double", StringComparison.InvariantCultureIgnoreCase) => typeof(double),
                string s when s.Contains("blob", StringComparison.InvariantCultureIgnoreCase) => typeof(byte[]),

                _ => DefaultType(originalType?.ToLower())
            };
        public Type DefaultType(string name)
        {
            Debug.Assert(false, $"cannot find  default type {name}");
            return typeof(string);
        }
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (string.IsNullOrWhiteSpace(name))
                yield return new ValidationResult($"{nameof(name)} is empty for field");

        }

        public string originalType;
        public bool IsNullable;
    }
}
