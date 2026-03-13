<script lang="ts">
  let tab = $state("");
  let proxy = $state("");
  let inputText = $state("");
  import { fade, fly } from "svelte/transition";
  import ProxyList from "./lib/ProxyList.svelte";
  import ProjectList from "./lib/ProjectList.svelte";
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
</script>

<main>
  <header>
    <form>
      <input type="text" bind:value={inputText} />
      <button type="submit" onclick={() => download(inputText)}>下载</button>
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
    </label>``
    {#key tab}
      <section in:fly={{ y: -50, duration: 200 }}>
        {#if tab === "Projects"}
          <ProjectList {proxy} {download} {isUrl} />
        {:else if tab === "Proxies"}
          <ProxyList bind:proxy />
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
