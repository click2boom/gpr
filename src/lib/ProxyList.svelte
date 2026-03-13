<script lang="ts">
import {fade} from 'svelte/transition'
  let {proxy=$bindable()}=$props()
  const Proxies:string[] = [
    'https://gh-proxy.com/',
    'https://github.akams.cn/',
    'https://github.chenc.dev/',
    'https://gh.1k.ink/',
    'https://gh.xmly.dev/'
    ]
</script>

<ul>
	{#each Proxies as p}
		<li transition:fade>
            <label >
			    <input type="radio" bind:group={proxy} value={p} name='Proxies'/>
                {p.slice(8,-1)}
            </label>
		</li>
	{/each}
</ul>

<style>

label:has(input[type=radio]:checked) {
  background-color: #646cff;
}


label {
  display: flex;
  width: 100%;
}
li {
    width: 10rem;
}
</style>