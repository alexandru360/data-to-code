@model Stankins.Interfaces.IDataToSent
@{
    
	string ClassNameFromTableName(string tableName){
		return tableName.Replace(" ","").Replace(".","").Replace("(","").Replace(")","");
	}
	
    var ds= Model.FindAfterName("DataSource").Value;
    var dtOptions= Model.FindAfterName("@@Options@@").Value;
    
    var nrRowsDS=ds.Rows.Count;
    
    var nameTablesToRender = new string[nrRowsDS];
    var tables=new System.Data.DataTable[nrRowsDS];
    for (int iRowDS = 0; iRowDS < nrRowsDS; iRowDS++)
    {
        var nameTable = ds.Rows[iRowDS]["TableName"].ToString();
        var renderTable = Model.FindAfterName(nameTable).Value;
        nameTablesToRender[iRowDS] = nameTable;
        tables[iRowDS]=renderTable;
    }
	string nameProperty(string original, string nameClass){
		var name = original.ToLower().Replace(" ","").Replace("event","event1").Replace("class","class1").Replace("object","object1").Replace("<","").Replace("/","").Replace(">","").Replace("(","").Replace(")","").ToLower();
		if(!IsIdentifier(name))
			name = "generated_"+name;
		if(nameClass.ToLower() == name)
            name= "generated_"+name;
		return name.Trim();
	}
	//https://docs.microsoft.com/en-us/dotnet/api/microsoft.codeanalysis.csharp.syntaxfacts?view=roslyn-dotnet
	bool IsIdentifier(string text)
	{
     if (string.IsNullOrEmpty(text))
        return false;
     if (!char.IsLetter(text[0]) && text[0] != '_')
        return false;
     for (int ix = 1; ix < text.Length; ++ix)
        if (!char.IsLetterOrDigit(text[ix]) && text[ix] != '_')
           return false;
     return true;
	}

}
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using TestWebAPI_BL;

namespace TestWEBAPI_DAL
{
    public partial class DatabaseContext : DbContext
    {
        public DatabaseContext()
        {

        }
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
        {
        }
        @foreach(var nameTable in nameTablesToRender){
			string nameClass=ClassNameFromTableName(nameTable);
            
            <text>
            public virtual DbSet<@(nameClass)> @(nameClass){ get; set; }
            </text>
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        @foreach(var nameTable in nameTablesToRender){
			string nameClass=ClassNameFromTableName(nameTable);
            var arr = nameTable.Split('.');
            for(var nr=0;nr<arr.Length;nr++){
                arr[nr]="\"" + arr[nr] + "\"";
            }
            System.Array.Reverse(arr);
            string  WithSchema =string.Join(",",arr);
            var nrPK = (int.Parse(dtOptions.Rows.Find(nameTable +"_PK_Number")[1].ToString())  );
            string idTable ="", idType = "", idTableSecond = "",idTypeSecond = "";
            
            if(nrPK >0 ){
                idTable = dtOptions.Rows.Find(nameTable +"_PK_0")[1].ToString();
                
                if( nrPK > 1 ) { 
                    // just 2 PK
                    idTableSecond = dtOptions.Rows.Find(nameTable +"_PK_1")[1].ToString();
                }
                string key = "it=>it."+ nameProperty(idTable,nameClass) +"" ;
                if( nrPK > 1) {
                    key = "it=>new { it."+ nameProperty(idTable,nameClass) + ",it."+ nameProperty(idTableSecond,nameClass) +"}"; 
                }
         <text>
            modelBuilder.Entity<@(nameClass)>()
                .ToTable(@Raw(WithSchema))
                .HasKey(@Raw(key));
         </text>
            }
            else{
                <text>
            modelBuilder.Entity<@(nameClass)>()
                .ToView(@Raw(WithSchema))
                .HasNoKey();
         </text>
            }

            

        }   
            //mapping columns if have spaces

        @{
            foreach(var dt in tables){
                string nameClass= ClassNameFromTableName(dt.TableName);
                var nrColumns = dt.Columns.Count;
                for(var iCol=0;iCol<nrColumns;iCol++){
                    var column=dt.Columns[iCol];
                    string nameColumn = nameProperty(column.ColumnName,nameClass);
                    <text>
                        modelBuilder.Entity<@(nameClass)>().Property(it => it.@(nameColumn)).HasColumnName("@(column.ColumnName)");
                    </text>
                }
            
            }
        }
            OnModelCreatingPartial(modelBuilder);
            Seed(modelBuilder);
        }
        void Seed(ModelBuilder modelBuilder){

            @foreach(var dt in tables){
                var nameTable = dt.TableName;
				string nameClass= ClassNameFromTableName(dt.TableName);
                var nrPK = (int.Parse(dtOptions.Rows.Find(nameTable +"_PK_Number")[1].ToString()));
                string idTable ="", idType = "",idTableSecond = "",idTypeSecond = "";
                if(nrPK >0 ){
                    idTable = dtOptions.Rows.Find(dt.TableName +"_PK_0")[1].ToString();
                    idType = dtOptions.Rows.Find(dt.TableName +"_PK_0_Type")[1].ToString();  
                }
                if(nrPK>1){
                    idTableSecond = dtOptions.Rows.Find(dt.TableName +"_PK_1")[1].ToString();
                    idTypeSecond = dtOptions.Rows.Find(dt.TableName +"_PK_1_Type")[1].ToString();  	
                }
                var nrRows =dt.Rows.Count; 
                if(nrRows > 200)
                    nrRows=200;
                    
                var nrColumns = dt.Columns.Count;
                for(var iRow=0;iRow<nrRows;iRow++){
                    string text="";
                    for(var iCol=0;iCol<nrColumns;iCol++){
                        var column=dt.Columns[iCol];
                        string nameColumn = nameProperty(column.ColumnName,nameClass);
                        var val =dt.Rows[iRow][iCol];
                        if(val == System.DBNull.Value)
                            val=null;
                        if(val != null)
                            val = val.ToString().Replace("\"","\"\"");

                        switch(column.DataType.Name.ToLower()){
                            case "string":
                                text+=", "+  nameColumn +" = " + "@\"" + (val??"") + "\"" ;
                                break;
                            case "int32":
                                text+=", "+  nameColumn +" = " +  (val??0)  ;
                                break;
                            case "decimal":
								text+=", "+  nameColumn +" = " +  (val??0) +"M" ;
                                break;
                            default:
                                text+=", "+ column.DataType.Name +"???"+ nameColumn +" = "+ val;  
                                break;  
                        };
                        
                    }
                    if(nrPK>0){
                    <text>
                    modelBuilder.Entity<@(nameClass)>().HasData(
                        new @(nameClass)(){ @(idTable) = @(iRow+1) @Raw(text) });
                    </text>
                    }
                }
            }

            OnSeed(modelBuilder);


        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
        partial void OnSeed(ModelBuilder modelBuilder);       
    }
}