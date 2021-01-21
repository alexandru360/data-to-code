using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GenerateApp.Controllers
{
    
    public class Table: BaseWithColumns
    {
                   
        
        public Table()
        {
            this.fields = new List<Field>();
        }

        public override IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {

            if (string.IsNullOrWhiteSpace(name))
                yield return new ValidationResult($"{nameof(name)} is empty");
            if ((fields?.Count ?? 0) == 0)
                yield return new ValidationResult($"{nameof(fields)} length =0");

            foreach (var f in fields)
            {
                foreach (var item in f.Validate(validationContext))
                {
                    yield return item;
                }
            }
            
        }
    }
}
