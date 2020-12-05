namespace TestWebAPI_Searches
{
    public interface IFieldSearch

    {
        string Name { get; }
        FieldTypeSearch fieldTypeSearch { get; } 
    }

}
