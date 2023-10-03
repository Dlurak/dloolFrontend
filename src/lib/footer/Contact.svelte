<script>
	import I18n from '$lib/I18n.svelte';
</script>

<div class="column flex-1">
	<div class="row">
		<h3><I18n key="footer.contact" /></h3>
		<ul class="grid grid-cols-2">
			<li>
				<a href="https://www.github.com/dlurak/dloolBackend">
					<i class="bx bxl-github" />
					<I18n key="footer.contact.github.backend" />
				</a>
			</li>
			<li>
				<a href="https://www.github.com/dlurak/dloolFrontend">
					<i class="bx bxl-github" />
					<I18n key="footer.contact.github.frontend" />
				</a>
			</li>
			<li>
				<a href="https://dlurak.github.io/dloolBackend/">
					<i class="bx bx-book" />
					<I18n key="footer.contact.apiDocs" />
				</a>
			</li>
			<li>
				<a href="https://discord.gg/Kp2BCyR33q">
					<i class="bx bxl-discord-alt" />
					<I18n key="footer.contact.discord" />
				</a>
			</li>
		</ul>
	</div>
</div>
