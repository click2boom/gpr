<script lang="ts">
	type Project = {
		name: string
		version: string
		file: string
		source:string
	};
	const {download,isUrl,proxy} = $props()
	const getLatestUrl = (project: Project): string =>
		`https://github.com/${project.name}/releases/latest/download/${project.file}`;
	let projects: Project[] = $state([
		{
			source:'https://github.com/zen-browser/desktop/releases/download/1.19.2b/zen.installer.exe',
			name: "zen-browser/desktop",
			version: "1.19.2b",
			file: "zen.installer.exe",
		},
	]);

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

	const proxyUrlDelay = (proxy: string): number => {
		return 0;
	};
</script>

<ul>
	{#each projects as project}
		<li>
			<button onclick={() => download(getLatestUrl(project))}>
				{project.name} <i>{project.version}</i>
				<a href={project.source}>{project.file}</a>
			</button>
		</li>
	{/each}
</ul>
<style>
	ul,li {
		width: fit-content;
	}
</style>

