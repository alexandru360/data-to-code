namespace GenerateApp.Controllers
{
    public class StankinsGenerator
    {
        public Backend[] backend { get; set; }
        public Frontend[] frontend { get; set; }
    }

    public class Backend
    {
        public string folder { get; set; }
        public string name { get; set; }
        public string[] worksWithFrontEnd { get; set; }
        public string[] copyTableFiles { get; set; }
    }

    public class Frontend
    {
        public string folder { get; set; }
        public string[] worksWithBackEnd { get; set; }
        public string name { get; set; }
        public string[] copyTableFiles { get; set; }
    }
}