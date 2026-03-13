<script module lang="ts">

</script>

<script lang="ts">
	const { downloadLatestFile, projects } = $props();
</script>

<ul>
	{#each projects as project}
		<li>
			<button onclick={() => downloadLatestFile(project)}>
				{project.name} <i>{project.version}</i>
				<a href={project.source}>{project.file}</a>
			</button>
		</li>
	{/each}
</ul>

<style>
	ul,
	li {
		width: fit-content;
	}
</style>
