<script lang="ts">
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import { browser } from '$app/environment';
	import { personRolesStore, genderTypesStore } from '$lib/store/general.store';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	personRolesStore.set(data.roles);
	LocalStorageUtils.setItem('personRoles', JSON.stringify(data.roles));
	let personRoles = [],
		loginRoleId = 1;

	if (browser) {
		const tmp = LocalStorageUtils.getItem('personRoles');
		personRoles = JSON.parse(tmp);
		const adminRole = personRoles?.find((x) => x.RoleName === 'System admin');
		if (adminRole) {
			loginRoleId = adminRole.id;
		}
		LocalStorageUtils.removeItem('prevUrl');
	}
</script>

<svelte:head>
	<title>REAN careplans</title>
	<meta name="description" content="REAN careplans" />
</svelte:head>
<body>
	<div class="nav h-12 w-full bg-secondary-500" />
	<div class="w-full h-full" id="background-image">
		<div class="bg-back-ground h-full w-full">
			<!-- <div class="h-10 w-screen shadow-xl mb-4 bg-[#7165E3]" /> -->
			<div class="h-full w-full px-3">
				<div class=" flex justify-center flex-col items-center">
					<img
						class="ct-image w-36 mt-7 mb-7"
						alt="logo"
						src="https://www.reanfoundation.org/wp-content/uploads/2021/10/REAN-Foundation-brand-Logo.png"
					/>
					<form
						method="post"
						action="?/login"
						class=" shadow-bottom-right p-8 pb-1 pt-5 rounded-lg mt-5 bg-secondary-50"
					>
						<!-- <input class="hidden" type="number" name="loginRoleId" value={loginRoleId}> -->
						<div class="hidden">
							<input name="loginRoleId" class="hidden" value={loginRoleId} />
						</div>
						<div class="justify-center w-full mt-5 h-50">
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<label class="mb-2" for="username">
								<span class="text-primary-500">Username / Email</span>
								<span class="label-text-alt" />
							</label>
							<input type="text" name="username" required class="input mb-4" />
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<label class="mb-2" for="password">
								<div class="grid grid-flow-col">
									<span class="text-left text-primary-500">Password / OTP</span>
									<span class="text-right text-primary-500 ml-4 sm:ml-12">
										<b>Generate OTP</b>
									</span>
								</div>
							</label>
							<input type="password" name="password" required class=" input" />
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<label class="lable">
								<span class=" text-primary-500">
									<b>Forgot Password?</b>
								</span>
							</label>
							<br />
							<button type="submit" class="btn variant-filled-secondary mb-6 w-full">Login</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<footer class="w-full fixed bottom-0 bg-primary-500 text-center p-2">
		<a href="https://reanfoundation.org" class="!text-white">&#xa9; 2022 REAN Foundation</a>
	</footer>
</body>
