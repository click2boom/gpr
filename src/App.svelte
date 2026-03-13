<script lang="ts">
  import { fly } from "svelte/transition";
  import { writable } from 'svelte/store';
  import ProxyList from "./lib/ProxyList.svelte";
  import ProjectList from "./lib/ProjectList.svelte";
  import {defaultProjects,Proxies,defaultProxy,type Project} from './data'
  let tab = $state("");
  let proxy = $state("");
  let inputText = $state("");
  const download = (url: string) => {
    if (!isUrl(url)) return;
    console.log(`Current Proxy: ${proxy}`);
    console.log(`Downloading: ${url}`);

    window.open(proxy + url, "_blank");
  };
  const isUrl = (text: string): boolean => {
    console.log("输入非网址");
    return /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i.test(text);
  };

	const downloadLatestFile=(project:Project)=>download(getLatestUrl(project))
	const getLatestUrl = (project: Project): string =>
		`https://github.com/${project.name}/releases/latest/download/${project.file}`;

  const parseUrl = (url: string): Project | null => {
		const reg =
			/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/releases\/download\/([^\/]+)\/(.+)$/;
		const match = url.match(reg);
		if (!match) return null;
		return {
			source:url,
			name: `${match[1]}/${match[2]}`,
			version: match[3],
			file: match[4],
		};
	};
	let projects:Project[] = $state(defaultProjects);
	const projectsWritable = writable(defaultProjects, (set) => {
		const str = localStorage.getItem('Projects');
		if (!str) return;
		set(JSON.parse(str));
	});
  const proxyWritable = writable(defaultProxy, (set)=>{
    const str = localStorage.getItem('Proxy');
    if (!str) return;
    set(str)
  })
  proxyWritable.subscribe(p=>{
    localStorage.setItem('Proxy',p)
    proxy = p
  })
	projectsWritable.subscribe(p => {
		localStorage.setItem('Projects', JSON.stringify(p));
		projects = p
    
	});
  const handleFormSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    if (!isUrl(inputText)) return inputText='';
    download(inputText);
    const project = parseUrl(inputText);
    if (!project) return inputText='';
    projectsWritable.update(p => [...p, project]);
    tab = 'Projects'
  }
</script>

<main>
  <header>
    <form onsubmit={handleFormSubmit}>
      <input type="text" bind:value={inputText} />
      <button type="submit" >下载</button>
    </form>
  </header>
  <tab>
    
    <label>
      <input type="radio" bind:group={tab} value="Projects" name="tab" />
      项目
    </label>
    <label>
      <input type="radio" bind:group={tab} value="Proxies" name="tab" />
      代理
    </label>
    {#key tab}
      <section in:fly={{ y: -50, duration: 200 }}>
        {#if tab === "Projects"}
          <ProjectList {downloadLatestFile} {projects} />
        {:else if tab === "Proxies"}
          <ProxyList bind:proxy/>
        {/if}
      </section>
    {/key}

  </tab>
</main>
<style>

  label:has(input[type="radio"]:checked) {
    background-color: #646cff;
    
  }
  form > button {
    white-space: nowrap;
    
  }
  tab {
    display: flex;
    /* flex-direction: column; */
    gap: 0.2rem;
    justify-content: center;
    position: relative;
    width: 50vw;
  }
  header {
    width: 50vw;
    /* background-color: red; */
  }
  form {
    display: flex;
    justify-content: center;
    gap: .2rem;
  }
  input {
    flex: 1;
  }

  label {
    display: flex;
    max-width: fit-content;
    padding: 0.5rem 1rem;
    border: 1px solid #646cff;
    border-radius: 0.4rem;
    transition: 0.2s;
    white-space: nowrap;
    
  }
  section {
    position: absolute;
    top: 3rem;
    width: 100%;
  }
  main {
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }
</style>
g