<script lang="ts">
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Icon from '@iconify/svelte';
    import type { PageServerData } from './$types';
    import InputChip from '$lib/components/input-chips.svelte';

    //////////////////////////////////////////////////////////////////////

    const userId = $page.params.userId;
    const hospitalId = $page.params.id;
    const editRoute = `/users/${userId}/hospitals/${hospitalId}/edit`;
    const viewRoute = `/users/${userId}/hospitals/${hospitalId}/view`;
    const hospitalsRoute = `/users/${userId}/hospitals`;

    export let form;
    export let data: PageServerData;
    let id = data.hospital.id;
    let hospitalName = data.hospital.Name;
    let healthSystemId = data.hospital.HealthSystemId;
    let healthSystemName = data.hospital.HealthSystemName;
    let tags = data.hospital.Tags;
    let healthSystems = data.healthSystems;

    console.log('hospital name  ->', hospitalName);
    console.log('healthSystemId ->', healthSystemId);
    console.log('tags           ->', tags);
    console.log('healthSystem   ->', healthSystemName);

    //Original data
    let _hospitalName = hospitalName;
    let _healthSystemId = healthSystemId;
    let _tags = JSON.stringify(tags);
    const r = healthSystems.filter((hs) => {
        return hs.id === healthSystemId;
    });

    function handleReset() {
        hospitalName = _hospitalName;
        healthSystemId = _healthSystemId;
        tags = JSON.parse(_tags);
    }

    const breadCrumbs = [
        { name: 'Hospitals', path: hospitalsRoute },
        { name: 'Edit', path: editRoute }
    ];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
    method="post"
    action="?/updateHospitalAction"
    class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
>
    <table class="table">
        <thead class="!variant-soft-secondary">
            <tr>
                <th>Edit Hospital</th>
                <th class="text-end">
                    <a
                        href={viewRoute}
                        class="btn p-2 -my-2 variant-soft-secondary"
                    >
                        <Icon
                            icon="material-symbols:close-rounded"
                            class="text-lg"
                        />
                    </a>
                </th>
            </tr>
        </thead>
        <tbody class="!bg-white dark:!bg-inherit">
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Name *</td>
                <td>
                    <input
                        type="text"
                        class="input {form?.errors?.hospitalName ? 'border-error-300 text-error-500' : ''}"
                        name="hospitalName"
                        placeholder="Enter name here..."
                        bind:value={hospitalName}
                        required
                    />
                    {#if form?.errors?.hospitalName}
                        <p class="text-error-500 text-xs">{form?.errors?.hospitalName[0]}</p>
                    {/if}
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Health System *</td>
                <td>
                    <select
                        name="healthSystemId"
                        class="select select-primary w-full "
                    >
                        <option value={healthSystemId}>{r[0].Name}</option>
                        {#each healthSystems as healthSystem}
                            <option value={healthSystem.id}>{healthSystem.Name}</option>
                        {/each}
                    </select>
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td class="align-top">Tags</td>
                <td>
                    <InputChip
                        chips="variant-filled-error rounded-2xl"
                        name="tags"
                        bind:value={tags}
                    />
                </td>
            </tr>
        </tbody>
    </table>
    <div class="flex gap-2 p-2 justify-end">
        <button
            type="button"
            on:click={handleReset}
            class="btn variant-soft-secondary">Reset</button
        >
        <button
            type="submit"
            class="btn variant-filled-secondary">Submit</button
        >
    </div>
</form>
