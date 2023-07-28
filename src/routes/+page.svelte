<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data;
	const { form, errors, constraints, message, delayed, enhance } = superForm(data.form, {
		taintedMessage: 'Are you sure you want to leave?'
	});
</script>

<main class="container">
	<h1>Welcome to SvelteKit</h1>
	<small
		>This is a small demo styled with PicoCSS that uses sveltekit-superforms that is powered by zod.</small
	>
	<p>
		Visit <a href="https://superforms.rocks/get-started">superforms</a> to read the documentation
	</p>

	<SuperDebug data={$form} label="Debug data provided by sveltekit-superforms SuperDebug" />

	<form method="POST" use:enhance>
		<input type="hidden" value={$form.id} />
		<div class="grid">
			<label for="firstname">
				First name
				<input
					type="text"
					name="firstName"
					placeholder="First name"
					bind:value={$form.firstName}
					{...$constraints.firstName}
				/>
			</label>
			{#if $errors.firstName}<small class="error">{$errors.firstName}</small>{/if}

			<label for="lastname">
				Last name
				<input
					type="text"
					name="lastName"
					placeholder="Last name"
					bind:value={$form.lastName}
					{...$constraints.lastName}
				/>
			</label>
			{#if $errors.lastName}<small class="error">{$errors.lastName}</small>{/if}
		</div>

		<label for="email">Email address</label>
		<input
			type="email"
			name="email"
			placeholder="Email address"
			bind:value={$form.email}
			{...$constraints.email}
		/>
		{#if $errors.email}<small class="error">{$errors.email}</small>{/if}
		<small>This page uses client side validation as well as server side validation.</small>

		<button type="submit" aria-busy={$delayed}>Submit</button>
		{#if $message} <small class="success">{$message}</small>{/if}
	</form>
</main>

<style>
	.error {
		color: var(--del-color);
	}
	.success {
		color: var(--ins-color);
	}
</style>
