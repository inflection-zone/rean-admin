<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import { InputChip } from '@skeletonlabs/skeleton';
	import { showMessage } from '$lib/utils/message.utils';

	let retrievedTags = '';
	let tagsPlaceholder = 'Enter a tags here...';

	export let form;
	const userId = $page.params.userId;
	let image = undefined;
	let favicon = undefined;
	let fileinput;

	const createRoute = `/users/${userId}/newsfeeds/create`;
	const newsfeedRoute = `/users/${userId}/newsfeeds`;

	const breadCrumbs = [
		{
			name: 'Newsfeeds',
			path: newsfeedRoute
		},
		{
			name: 'Create',
			path: createRoute
		}
	];

	const upload = async (imgBase64, filename) => {
		const data = {};
		console.log(imgBase64);
		const imgData = imgBase64.split(',');
		data['image'] = imgData[1];
		console.log(JSON.stringify(data));
		const res = await fetch(`/api/server/file-resources/upload`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				filename: filename
			},
			body: JSON.stringify(data)
		});
		console.log(Date.now().toString());
		const response = await res.json();
		if (response.Status === 'success' && response.HttpCode === 201) {
			const imageResourceId = response.Data.FileResources[0].id;
			console.log('imageResourceId', imageResourceId);
			const image_ = response.Data.FileResources[0].Url;
			console.log('image_', image_);
			if (image_) {
				image = image_;
			}
			console.log(image);
		} else {
			showMessage(response.Message, 'error');
		}
	};

	const uploadFavicon = async (imgBase64, faviconName) => {
		const data = {};
		console.log(imgBase64);
		const imgData = imgBase64.split(',');
		data['favicon'] = imgData[1];
		console.log(JSON.stringify(data));
		const res = await fetch(`/api/server/favicon-resource/upload`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				faviconName: faviconName
			},
			body: JSON.stringify(data)
		});
		console.log(Date.now().toString());
		const response = await res.json();
		if (response.Status === 'success' && response.HttpCode === 201) {
			const imageResourceId = response.Data.FileResources[0].id;
			console.log('imageResourceId', imageResourceId);
			const image_ = response.Data.FileResources[0].Url;
			console.log('image_', image_);
			if (image_) {
				favicon = image_;
			}
			console.log(favicon);
		} else {
			showMessage(response.Message, 'error');
		}
	};

	const onFileSelected = async (e) => {
		let f = e.target.files[0];
		const filename = f.name;
		let reader = new FileReader();
		reader.readAsDataURL(f);
		reader.onload = async (e) => {
			fileinput = e.target.result;
			await upload(e.target.result, filename);
		};
	};

	const onFaviconSelected = async (e) => {
		let f = e.target.files[0];
		const faviconName = f.name;
		let reader = new FileReader();
		reader.readAsDataURL(f);
		reader.onload = async (e) => {
			fileinput = e.target.result;
			await uploadFavicon(e.target.result, faviconName);
		};
	};
</script>

<main class="h-screen mb-44">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="">
		<form
			method="post"
			action="?/createNewsfeedAction"
			class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Create Newsfeed
					<a href={newsfeedRoute}>
						<Fa
							icon={faMultiply}
							size="lg"
							class="absolute right-0 lg:pr-3 md:pr-2 pr-0 text-white"
						/>
					</a>
				</div>
			</div>

			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Title *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="title"
						required
						placeholder="Enter title here..."
						class="input w-full {form?.errors?.title
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
						value={form?.data?.title ?? ''}
					/>
					{#if form?.errors?.title}
						<p class="text-error-500 text-xs">{form?.errors?.title[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-start mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Description</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						name="description"
						placeholder="Enter description here..."
						class="textarea w-full {form?.errors?.description
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.description}
						<p class="text-error-500 text-xs">{form?.errors?.description[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Category</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="category"
						placeholder="Enter category here..."
						class="input w-full {form?.errors?.category
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
						value={form?.data?.category ?? ''}
					/>
					{#if form?.errors?.category}
						<p class="text-error-500 text-xs">{form?.errors?.category[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Link</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="url"
						name="link"
						placeholder="Enter link here..."
						class="input w-full {form?.errors?.link
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
						value={form?.data?.link ?? ''}
					/>
					{#if form?.errors?.link}
						<p class="text-error-500 text-xs">{form?.errors?.link[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Language *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="language"
						required
						placeholder="Enter language here..."
						class="input w-full {form?.errors?.language
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
						value={form?.data?.language ?? ''}
					/>
					{#if form?.errors?.language}
						<p class="text-error-500 text-xs">{form?.errors?.language[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Copyright</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="copyright"
						placeholder="Enter copyright here..."
						class="input w-full {form?.errors?.copyright
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
						value={form?.data?.copyright ?? ''}
					/>
					{#if form?.errors?.copyright}
						<p class="text-error-500 text-xs">{form?.errors?.copyright[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Favicon</span>
					</label>
				</div>
				<div class="flex flex-row gap-8 w-1/2 md:w-2/3 lg:w-2/3 ">
					<input
						accept="image/png, image/jpeg"
						type="file"
						id="fileUpload"
						class="input"
						name="fileinput"
						placeholder="Image"
						on:change={async (e) => await onFaviconSelected(e)}
					/>
					<input type="hidden" name="favicon" value={favicon} />
					{#if form?.errors?.tags}
						<p class="text-error-500 text-xs">{form?.errors?.tags[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center my-2 mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Image</span>
					</label>
				</div>
				<div class="flex flex-row gap-8 w-1/2 md:w-2/3 lg:w-2/3 ">
					<input
						accept="image/png, image/jpeg"
						type="file"
						id="fileUpload"
						class="input"
						name="fileInput"
						placeholder="Image"
						on:change={async (e) => await onFileSelected(e)}
					/>
					<input type="hidden" name="image" value={image} />
					{#if form?.errors?.image}
						<p class="text-error-500 text-xs">{form?.errors?.image[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-start mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Tags *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<InputChip
						chips="variant-filled-error rounded-2xl"
						name="tags"
						required
						placeholder={tagsPlaceholder}
					/>
					{#if form?.errors?.tags}
						<p class="text-error-500 text-xs">{form?.errors?.tags[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center mt-7 lg:mx-16 md:mx-12 mr-10">
				<div class="w-3/4" />
				<div class="w-1/4 ">
					<button type="submit" class="btn variant-filled-primary w-full mb-10 "> Submit </button>
				</div>
			</div>
		</form>
	</div>
</main>
