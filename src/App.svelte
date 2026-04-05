<script lang="ts">
  import { setContext } from "./lib/context";
  import type { Project, Proxy, Context } from "./lib/type";
  import { InitProject, InitProxy } from "./lib/data";

  import {
    LocalStorageWritable,
    parseProject,
    download,
    parseUrl,
  } from "./lib/tool";

  const proxies = LocalStorageWritable<Proxy[]>("Proxies", [
    InitProxy,
    {
      name: "wget",
      url: "https://wget.la/",
    },
  ]);
  const project = LocalStorageWritable<Project>("Project", InitProject);
  const projects = LocalStorageWritable<Project[]>("Projects", [InitProject]);
  const proxy = LocalStorageWritable<Proxy>("Proxy", InitProxy);
  let inputText = $state("");
  const context: Context = {
    project: $project,
    projects: $projects,
    proxies: $proxies,
    proxy: $proxy,
  };

  setContext(context);
  const handleFormSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    try {
      $project = parseProject(inputText);
      const url = parseUrl($project);
      download($proxy.url + url);
      $projects= [...$projects,$project]
    } catch {}
  };


</script>

<main>
  <p><i>{$proxy.name}</i> {inputText}</p>
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
              {#if p.url.length > 0}
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  {p.name}
                </a>
              {:else}
                {p.name}
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
             <button class="project" onclick={() => {download($proxy.url+parseUrl(p))}}>
                <a href={parseUrl(p)} target="_blank" rel="noopener noreferrer">{p.author}/{p.name}/{p.version}/{p.file}</a>
             </button>
             <button class="del" onclick={()=>$projects=$projects.filter((e)=>e!==p)}>x</button>
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
    width: 3rem;
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
