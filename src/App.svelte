<script lang="ts">
  import { setContext } from "./lib/context";
  import type { Project, Context } from "./lib/type";

  import {
    LocalStorageWritable,
    download,
    parseProject,isUrl
  } from "./lib/tool";

  const proxies = LocalStorageWritable<string[]>("Proxies", ['直连',"https://wget.la/"]);
  const project = LocalStorageWritable<Project>("Project", Object());
  const projects = LocalStorageWritable<Project[]>("Projects", []);
  const proxy = LocalStorageWritable<string>("Proxy", '');
  let inputText = $state("");
  const context: Context = {
    project: $project,
    projects: $projects,
    proxies: $proxies
  };

  setContext(context);
  const handleFormSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    try {
      download($proxy + inputText);
      if (!isUrl(inputText)) return
      const url = inputText
      $project = parseProject(url)
      $projects= [...$projects,$project]
    } catch {}
  };


</script>

<main>
  <p><i>{$proxy?.slice(8,-1)}</i> {inputText}</p>
  <form onsubmit={handleFormSubmit}>
    <input type="text" id="inputText" bind:value={inputText} />
    <button type="submit">提交</button>
  </form>
  <section>
    <proxy>
      <ul>
        {#each $proxies as p}
          <li>
            <button class="proxy" onclick={() => ($proxy = p)}>
              {#if p!=='直连'}
                <a href={p} target="_blank" rel="noopener noreferrer">
                  {p.slice(8,-1)}
                </a>
              {:else}  {p} 
              {/if}
            </button>
          </li>
        {/each}
      </ul>
    </proxy>
    <project>
      <ul>
        {#each $projects as p}
          <li>
             <button class="project" onclick={() => download($proxy+p.url)}>
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  {#if p.type==="Specific" }
                    {p.author}/{p.name}/{p.version}/{p.file}
                  {:else if p.type==="Latest"}
                   {p.author}/{p.name}/{p.version}/{p.file}
                  {:else if p.type==="Source"}
                     {p.author}/{p.name}/{p.branch}.zip
                  {:else}
                    {p.url}
                  {/if}
                </a>
             </button>
             <button class="del" onclick={()=>$projects=$projects.filter((e)=>e!==p)}>
              <i style:font-size="smaller">{p.type}</i>
              X</button>
          </li>
        {/each} 
      </ul>
    </project>
  </section>
</main>

<style>
  main {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 1rem;
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  button.proxy {
    min-width: 100%;
  }
  form {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  input#inputText {
    flex: 1;
  }
  section {
    display: flex;
    gap:.5rem;
  }
  ul> li {
    display: flex;
  }
  button.del:hover {
    background-color: rgba(255, 0, 0, .3);
  }
  button.project,project{
    flex: 1;
  }
</style>
