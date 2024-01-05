<script>
	import { createEventDispatcher } from 'svelte/internal';
	import { fly, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	const dispatch = createEventDispatcher();
	export let name;
	export let value = [];
	export let whitelist = [];
	export let max = 10;
	export let minlength = -1;
	export let maxlength = -1;
	export let allowUpperCase = true;
	export let allowDuplicates = false;
	export let validation = () => true;
	export let duration = 150;
	export let required = false;
	export let chips = 'variant-filled';
	export let invalid = 'input-error';
	export let padding = 'p-2';
	export let rounded = 'rounded-container-token';
	const cBase = 'textarea cursor-pointer';
	const cInterface = 'space-y-4';
	const cChipList = 'flex flex-wrap gap-2';
	const cInputField = 'unstyled bg-transparent border-0 !ring-0 p-0 pl-1 w-full';
	let inputValue = '';
	let inputValid = true;
	function onInputHandler() {
		inputValid = true;
	}
	function validate() {
		if (!inputValue) return false;
		if (validation !== void 0 && !validation()) return false;
		if (max !== -1 && value.length >= max) return false;
		if (minlength !== -1 && inputValue.length < minlength) return false;
		if (maxlength !== -1 && inputValue.length > maxlength) return false;
		if (whitelist.length > 0 && !whitelist.includes(inputValue)) return false;
		if (allowDuplicates === false && value.includes(inputValue)) return false;
		return true;
	}
	function addChip(event) {
		event.preventDefault();
		inputValid = validate();
		if (inputValid === false) return;
		inputValue = inputValue.trim();
		inputValue = allowUpperCase ? inputValue : inputValue.toLowerCase();
		value = [...value, inputValue];
		dispatch('add', { event, chipIndex: value.length - 1, chipValue: inputValue });
		inputValue = '';
	}
	function removeChip(event, chipIndex, chipValue) {
		if ($$restProps.disabled) return;
		value = value.filter((_, i) => i !== chipIndex);
		dispatch('remove', { event, chipIndex, chipValue });
	}
	$: classesInvalid = inputValid === false ? invalid : '';
	$: classesBase = `${cBase} ${padding} ${rounded} ${$$props.class ?? ''} ${classesInvalid}`;
	$: classesInterface = `${cInterface}`;
	$: classesChipList = `${cChipList}`;
	$: classesInputField = `${cInputField}`;
</script>

<div class="input-chip {classesBase}" class:opacity-50={$$restProps.disabled}>
	<!-- NOTE: Don't use `hidden` as it prevents `required` from operating -->
	<div class="h-0 overflow-hidden">
		<select bind:value {name} multiple {required} tabindex="-1">
			<!-- NOTE: options are required! -->
			{#each value as option}<option value={option}>{option}</option>{/each}
		</select>
	</div>
	<!-- Interface -->
	<div class="input-chip-interface {classesInterface}">
		<!-- Input Field -->
		<form on:submit={addChip}>
			<input
				type="text"
				bind:value={inputValue}
				placeholder={$$restProps.placeholder ?? 'To add a tag, type and press enter.'}
				class="input-chip-field {classesInputField}"
				on:input={onInputHandler}
				on:input
				disabled={$$restProps.disabled}
			/>
		</form>

		<!-- Chip List -->
		{#if value.length}
			<div
				class="input-chip-list {classesChipList}"
				transition:fly|local={{ duration, opacity: 0, y: -20 }}
			>
				{#each value as c, i (c)}
					<!-- Wrapping div required for FLIP animation -->
					<div animate:flip={{ duration }}>
						<button
							class="chip {chips}"
							on:click={(e) => {
								e.preventDefault();
								removeChip(e, i, c);
							}}
							on:click
							on:keypress
							on:keydown
							on:keyup
							transition:scale|local={{ duration, opacity: 0 }}
						>
							<span>{c}</span>
							<span>✕</span>
						</button>
					</div>
				{/each}
				{#if value.length > 9 }
				<div class="text-error-500">Number of tags should be less than or equal to 10</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
