<script lang="ts">
  import { fade } from "svelte/transition";
  import {Proxies} from '../data'
  let { proxy=$bindable() } = $props();
</script>

<ul>
  {#each Proxies as p}
    <li transition:fade>
      <label>
        <input type="radio" bind:group={proxy} value={p} name="Proxies" />
        {p.slice(8, -1)}
      </label>
    </li>
  {/each}
</ul>

<style>
  label:has(input[type="radio"]:checked) {
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
