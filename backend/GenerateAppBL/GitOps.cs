using NPOI.SS.Formula.Functions;
using Octokit;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace GenerateApp.Controllers
{
    public static class GitOps
    {
        public static readonly string CredentialsToken;
        static GitOps()
        {
            CredentialsToken = Environment.GetEnvironmentVariable("GitHubKey");
        }
        public static async Task<string> CreateBranch(string branch)
        {
            var github = new GitHubClient(new ProductHeaderValue("GithubCommitTest"));
            github.Credentials = new Credentials(CredentialsToken);
            var user = await github.User.Get("ignatandrei");
            Console.WriteLine($"{user.Name} have {user.PublicRepos} public repos");
            var owner = "ignatandrei";
            var repo = "generateApp";
            var repoId = (await github.Repository.Get(owner, repo)).Id;
            var masterNew = await github.Git.Reference.Get(repoId, "heads/master");
            var newBranch = await github.Git.Reference.Create(repoId, new NewReference("refs/heads/" + branch, masterNew.Object.Sha));
            var createChangeSet = await github.Repository.Content.CreateFile(
                                            repoId,
                                            "readme.txt",
                                            new CreateFileRequest("File creation",
                                                                  "Hello World!",
                                                                  newBranch.Ref
                                                                  ));


            return "refs/heads/" + branch;
        }

        public static async Task<bool> CommitDir(string headMasterRef, string folder)
        {
            var sep = Path.DirectorySeparatorChar;
            var di = new DirectoryInfo(folder);

            var files = di.GetFiles("*", SearchOption.AllDirectories);
            var filesWithRelative = files
                .Select(it => new { it.FullName, Relative = it.FullName.Replace(di.FullName, "") })
                .Select(it => new { it.FullName, Rel = it.Relative.StartsWith(sep) ? it.Relative.Substring(1) : it.Relative })
                .Select(it => new { it.FullName, Rel = it.Rel.Replace(@"\", "/") })
                .ToArray();
            ;


            var Client = new GitHubClient(new ProductHeaderValue("GithubCommitTest"));
            Client.Credentials = new Credentials(CredentialsToken);
            var owner = "ignatandrei";
            var repo = "generateApp";
            var repoId = (await Client.Repository.Get(owner, repo)).Id;
            //Client.Repository.Release.Get(repoId,"asd").Result.Assets.First().
            //var headMasterRef = "heads/master";
            //headMasterRef = "refs/heads/tsf1";
            var masterReference = await Client.Git.Reference.Get(repoId, headMasterRef); // Get reference of master branch
            var latestCommit = await Client.Git.Commit.Get(repoId, masterReference.Object.Sha); // Get the laster commit of this branch
            var nt = new NewTree { BaseTree = latestCommit.Tree.Sha };


            foreach (var item in filesWithRelative)
            {
                Console.WriteLine($"reading {item.Rel}");
                var contentFile = File.ReadAllText(item.FullName);
                var textBlob = new NewBlob { Encoding = EncodingType.Utf8, Content = contentFile };
                var textBlobRef = await Client.Git.Blob.Create(repoId, textBlob);
                nt.Tree.Add(new NewTreeItem { Path = item.Rel, Mode = "100644", Type = TreeType.Blob, Sha = textBlobRef.Sha });

            }
            var newTree = await Client.Git.Tree.Create(repoId, nt);

            // 4. Create the commit with the SHAs of the tree and the reference of master branch
            // Create Commit
            var newCommit = new NewCommit("Commit test with several files", newTree.Sha, masterReference.Object.Sha);
            var commit = await Client.Git.Commit.Create(repoId, newCommit);

            // 5. Update the reference of master branch with the SHA of the commit
            // Update HEAD with the commit
            await Client.Git.Reference.Update(repoId, headMasterRef, new ReferenceUpdate(commit.Sha));
            return true;
        }

        public static async Task<bool> waitForRuns(string g)
        {
            var c = new HttpClient();
            c.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0");
            Workflow_Runs[] runs = null;
            var nrWaits = 20;
            while (--nrWaits > 0)
            {
                Console.WriteLine($"wait {nrWaits}");

                var str = await c.GetStringAsync("https://api.github.com/repos/ignatandrei/generateApp/actions/runs");
                var act = System.Text.Json.JsonSerializer.Deserialize<ActionRuns>(str);
                runs = act.workflow_runs.Where(it => it.head_branch == g).ToArray();
                var allStatus = runs.Select(it => it.status).Distinct().ToArray();
                if (runs.Length == 3 && allStatus.Length == 1 && allStatus[0] == "completed")
                    break;

                Console.WriteLine($"wait {nrWaits}");
                await Task.Delay(1000 * 60);

            }


            var lastRun = runs.FirstOrDefault();//search for "commit test...
            if (lastRun == null)
                //throw new ArgumentException($"cannot find runs for {g}");
                return false;

            if (lastRun.conclusion != "success")
            {
                return false;
                // throw new ArgumentException($"the run for {g} is without success. Please contact us to find more");
            }
            return true;
            //return new string[] { lastRun.html_url };
            //var arr = lastRun.check_suite_url.Split("/");
            //string suite = arr.Last();



            //var arts = await c.GetStringAsync(lastRun.artifacts_url);
            //var artifacts = System.Text.Json.JsonSerializer.Deserialize<Artifacts>(arts);
            //return artifacts.artifacts.Select(it =>

            //     $"https://github.com/ignatandrei/generateApp/suites/{suite}/artifacts/{it.id}"
            // ).ToArray();


        }
        public static string UnzipAndFindWin64(string fileZip)
        {
            var whereFolder = Path.Combine(Path.GetDirectoryName(fileZip), Path.GetFileNameWithoutExtension(fileZip));

            if (!Directory.Exists(whereFolder))
                Directory.CreateDirectory(whereFolder);

            ZipFile.ExtractToDirectory(fileZip, whereFolder);

            var publish = Directory.GetDirectories(whereFolder, "win-x64", new EnumerationOptions()
            {
                RecurseSubdirectories = true
            });

            return publish.FirstOrDefault();
        }
        static HttpClient client = new HttpClient();
        public static async Task<string> DownloadExe(ReleaseAsset[] assets, string where)
        {
            if (!Directory.Exists(where))
                Directory.CreateDirectory(where);

            var exe = assets.First(it => it.Name.Contains("Exe", StringComparison.InvariantCultureIgnoreCase));
            var newFileName = Path.Combine(where, exe.Name + ".zip");
            Console.WriteLine(newFileName);
            if (File.Exists(newFileName))
                return newFileName;

            //using (HttpClient client = new HttpClient())
            {
                string url = exe.BrowserDownloadUrl;
                using (var response = await client.GetAsync(url, HttpCompletionOption.ResponseHeadersRead))
                using (var streamToReadFrom = await response.Content.ReadAsStreamAsync())
                {

                    using (var streamToWriteTo = File.Open(newFileName, System.IO.FileMode.Create))
                    {
                        await streamToReadFrom.CopyToAsync(streamToWriteTo);
                    }
                }
            }

            return newFileName;
        }
        public static async Task<Release[]> FindAssetsInRelease(string name)
        {
            var Client = new GitHubClient(new ProductHeaderValue("GithubCommitTest"));
            Client.Credentials = new Credentials(CredentialsToken);
            var owner = "ignatandrei";
            var repo = "generateApp";
            var repoObj = await Client.Repository.Get(owner, repo);
            var assets = await Client.Repository.Release.GetAll(repoObj.Id);
            return assets.Where(it => it.Name.ToLower().Contains(name.ToLower())).ToArray();

            //var c = new HttpClient();
            //c.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0");
            //var str = await c.GetStringAsync("https://api.github.com/repos/ignatandrei/generateApp/releases");
            //var rel = JsonSerializer.Deserialize<Release[]>(str);
            //var found = rel.FirstOrDefault(it => it.tag_name == tagName);
            //if (found == null)
            //    return null;

            //return found.assets;

        }
    }
}
