<script lang="ts">
    import { browser } from '$app/environment';
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Confirm from '$lib/components/modal/confirmModal.svelte';
    import { Helper } from '$lib/utils/helper';
    import Icon from '@iconify/svelte';
    import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
    import date from 'date-and-time';
    import type { PageServerData } from './$types';

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    export let data: PageServerData;

    let hospitals = data.hospitals.Items;
    hospitals = hospitals.map((item, index) => ({ ...item, index: index + 1 }));
    // console.log('hospitals ->', hospitals);

    const userId = $page.params.userId;
    const hospitalRoute = `/users/${userId}/hospitals`;
    const editRoute = (id) => `/users/${userId}/hospitals/${id}/edit`;
    const viewRoute = (id) => `/users/${userId}/hospitals/${id}/view`;
    const createRoute = `/users/${userId}/hospitals/create`;

    const breadCrumbs = [{ name: 'Hospitals', path: hospitalRoute }];

    let hospitalName = undefined;
    let sortBy = 'Name';
    let sortOrder = 'ascending';
    let itemsPerPage = 10;
    let offset = 0;
    let totalHospitalsCount = data.hospitals.TotalCount;
    let isSortingName = false;
    let isSortingHealthSystemName = false;
    let items = 10;

    let paginationSettings = {
        page: 0,
        limit: 10,
        size: totalHospitalsCount,
        amounts: [10, 20, 30, 50]
    } satisfies PaginationSettings;

    async function searchHospital(model) {
        let url = `/api/server/hospitals/search?`;
        if (sortOrder) url += `sortOrder=${model.sortOrder}`;
        else url += `sortOrder=ascending`;

        if (sortBy) url += `&sortBy=${model.sortBy}`;
        if (itemsPerPage) url += `&itemsPerPage=${model.itemsPerPage}`;
        if (offset) url += `&pageIndex=${model.pageIndex}`;
        if (hospitalName) url += `&name=${model.hospitalName}`;
        // if (healthSystemName) url += `&healthSystemName=${healthSystemName}`;
        const res = await fetch(url, {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        });
        const response = await res.json();
        const items = response.Items;
        paginationSettings.size = items.length;
        // console.log(JSON.stringify(items, null, 2))
        hospitals = items.map((item, index) => ({ ...item, index: index + 1 }));
    }

    $: retrivedHospitals = hospitals.slice(
        paginationSettings.page * paginationSettings.limit,
        paginationSettings.page * paginationSettings.limit + paginationSettings.limit
    );

    // $: console.log('retrivedHospitals', retrivedHospitals);

    $: if (browser)
        searchHospital({
            hospitalName: hospitalName,
            // healthSystemName: healthSystemName,
            itemsPerPage: itemsPerPage,
            pageIndex: offset,
            sortOrder: sortOrder,
            sortBy: sortBy
        });

    function onPageChange(e: CustomEvent): void {
        let pageIndex = e.detail;
        itemsPerPage = items * (pageIndex + 1);
    }

    function onAmountChange(e: CustomEvent): void {
        itemsPerPage = e.detail;
        items = itemsPerPage;
    }

    function sortTable(columnName) {
        isSortingName = false;
        isSortingHealthSystemName = false;
        sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
        if (columnName === 'HospitalName') {
            isSortingName = true;
        }
        // else if (columnName === 'HealthSystemName') {
        //     isSortingHealthSystemName = true;
        // }
        sortBy = columnName;
    }

    const handleHospitalDelete = async (e, id) => {
        const hospitalId = id;
        await Delete({
            sessionId: data.sessionId,
            hospitalId
        });
        window.location.href = hospitalRoute;
    };

    async function Delete(model) {
        const response = await fetch(`/api/server/hospitals`, {
            method: 'DELETE',
            body: JSON.stringify(model),
            headers: { 'content-type': 'application/json' }
        });
    }
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
    <input
        type="text"
        name="hospitalName"
        placeholder="Search by Hospital Name"
        bind:value={hospitalName}
        class="input w-auto grow"
    />
    <!-- <input
        type="text"
        name="healthSystemName"
        placeholder="Search by Health System Name"
        bind:value={healthSystemName}
        class="input w-auto grow"
    /> -->
    <a
        href={createRoute}
        class="btn variant-filled-secondary">Add New</a
    >
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
    <table
        class="table"
        role="grid"
    >
        <thead class="!variant-soft-secondary">
            <tr>
                <th data-sort="index">Id</th>
                <th>
                    <button on:click={() => sortTable('HospitalName')}>
                        Name {isSortingName ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
                    </button>
                </th>
                <th>
                    <button on:click={() => sortTable('HealthSystemName')}>
                        Health System {isSortingHealthSystemName ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
                    </button>
                </th>
                <th>Created Date</th>
                <th />
                <th />
            </tr>
        </thead>
        <tbody class="!bg-white dark:!bg-inherit">
            {#if !retrivedHospitals}
                <tr>
                    <td colspan="6">No records found</td>
                </tr>
            {:else}
                {#each retrivedHospitals as row}
                    <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                        <td
                            role="gridcell"
                            aria-colindex={1}
                            tabindex="0">{row.index}</td
                        >
                        <td
                            role="gridcell"
                            aria-colindex={2}
                            tabindex="0"
                        >
                            <a href={viewRoute(row.id)}>
                                {row.Name !== null && row.Name !== ''
                                    ? Helper.truncateText(row.Name, 20)
                                    : 'Not specified'}
                            </a>
                        </td>
                        <td
                            role="gridcell"
                            aria-colindex={3}
                            tabindex="0"
                        >
                            {row.HealthSystemName !== null && row.HealthSystemName !== ''
                                ? Helper.truncateText(row.HealthSystemName, 50)
                                : 'Not specified'}
                        </td>
                        <td
                            role="gridcell"
                            aria-colindex={5}
                            tabindex="0"
                        >
                            {date.format(new Date(row.CreatedAt), 'DD-MMM-YYYY')}</td
                        >
                        <td>
                            <a
                                href={editRoute(row.id)}
                                class="btn p-2 -my-1 hover:variant-soft-primary"
                            >
                                <Icon
                                    icon="material-symbols:edit-outline"
                                    class="text-lg"
                                />
                            </a>
                        </td>
                        <td>
                            <Confirm
                                confirmTitle="Delete"
                                cancelTitle="Cancel"
                                let:confirm={confirmThis}
                                on:delete={(e) => handleHospitalDelete(e, row.id)}
                            >
                                <button
                                    on:click|preventDefault={() => confirmThis(handleHospitalDelete, row.id)}
                                    class="btn p-2 -my-1 hover:variant-soft-error"
                                >
                                    <Icon
                                        icon="material-symbols:delete-outline-rounded"
                                        class="text-lg"
                                    />
                                </button>
                                <span slot="title"> Delete </span>
                                <span slot="description"> Are you sure you want to delete a hospital? </span>
                            </Confirm>
                        </td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</div>

<div class="w-full variant-soft-secondary rounded-lg p-2">
    <Paginator
        bind:settings={paginationSettings}
        on:page={onPageChange}
        on:amount={onAmountChange}
        buttonClasses=" text-primary-500"
        regionControl="bg-surface-100 rounded-lg btn-group text-primary-500 border border-primary-200"
        controlVariant="rounded-full text-primary-500 "
        controlSeparator="fill-primary-400"
    />
</div>
