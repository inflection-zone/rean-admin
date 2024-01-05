<script lang="ts">
  import type { PageServerData } from './$types';
  import Select from 'svelte-select';
  import { page } from '$app/stores';
  import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
    import { enhance } from '$app/forms';

  //////////////////////////////////////////////////////////////////////////

  export let data: PageServerData;
  const userId = $page.params.userId;
  const careplanId = $page.params.careplanId;
  const activityId = $page.params.activityId;

  const editRoute = `/users/${userId}/careplan/careplans/${careplanId}/scheduling/${activityId}/edit`;
  const viewRoute = `/users/${userId}/careplan/careplans/${careplanId}/scheduling/${activityId}/view`;
  const schedulingRoute = `/users/${userId}/careplan/careplans/${careplanId}/scheduling`;

  let items = [];
  let assetTypes = data.assetTypes.Data.AssetTypes;
  let timeSlots = data.timeslot;
 

  let name = data.careplanActivitiy.Asset.Name;
  let assetId = data.careplanActivitiy.AssetId;
  let timeslot = data.careplanActivitiy.TimeSlot;
  let day = data.careplanActivitiy.Day;
  let assetName = data.careplanActivitiy.Asset.AssetType;

    console.log("Asset----",data.careplanActivitiy)
  //Original data
  let _name = name;
  let _assetId = assetId;
  let _timeslot = timeslot;
  let _day = day;
  let _assetName = assetName;


  console.log("AssetIs------",assetId);
  function handleReset() {
    name = _name;
    assetId = _assetId;
    timeslot = _timeslot;
    day = _day;
    assetName = _assetName;
  }

  const breadCrumbs = [
    {
      name: 'Scheduling',
      path: schedulingRoute
    },
    {
      name: 'Edit',
      path: editRoute
    }
  ];
  const assetRouteMap = {
    'Action plan': 'action-plans',
    Animation: 'animations',
    Appointment: 'appointments',
    Article: 'articles',
    Assessment: 'assessments',
    Audio: 'audio',
    Biometrics: 'biometrics',
    Challenge: 'challenges',
    Checkup: 'checkups',
    Consultation: 'consultations',
    Exercise: 'exercises',
    Goal: 'goals',
    Infographics: 'infographics',
    Medication: 'medications',
    Meditation: 'meditations',
    Message: 'messages',
    Nutrition: 'nutritions',
    Physiotherapy: 'physiotherapy',
    Priority: 'priorities',
    Reflection: 'reflections',
    Reminder: 'reminders',
    Video: 'video',
    'Web link': 'web-links',
    'Web newsfeed': 'web-newsfeeds',
    'Word power': 'word-power'
  };
  let selectedAssetType = 'Action plan';
  const onSelectAssetType = async (e) => {
    selectedAssetType = e.currentTarget.value;
    await searchAssets({
      sessionId: data.sessionId,
      selectedAssetType
    });
  };
  async function searchAssets(model) {
    const selectedAssetRoute = assetRouteMap[selectedAssetType];

    let url = `/api/server/assets/search?assetType=${selectedAssetRoute}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    });
    const response = await res.json();
    items = response.map((obj) => {
      return { value: obj.id, label: obj.Name };
    });
    console.log("items:::::::: " ,items);
    return items;
  }
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/updateCarePlanActivityAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
  use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Careplan Activity</th>
				<th class="text-end">
					<a href={viewRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Asset Type* </td>
				<td>
					<select
            name="assetType"
            bind:value={assetName}
            class="select select-primary w-full"
            on:change={onSelectAssetType}
          >
            {#each assetTypes as val}
              <option value={val}>
                {val}
              </option>
            {/each}
          </select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Asset* </td>
				<td>
					<Select class="select select-primary w-full" {items} bind:value={name} />
          <input type="hidden" name="assetId"  bind:value={assetId} />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Scheduled Day*</td>
				<td>
					<input
            bind:value={day}
            type="text"
            name="day"
            required
            placeholder="Enter scheduled day here..."
            class="input input-primary w-full "
          />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Slot of the Day*</td>
				<td>
					<select name="timeSlot" class="select select-primary w-full " bind:value={timeslot}>
            {#each timeSlots as val}
              <option value={val}>
                {val}
              </option>
            {/each}
          </select>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
		<button type="button" on:click={handleReset} class="btn variant-soft-secondary">Reset</button>
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
