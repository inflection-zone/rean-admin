<script lang="ts">
    import { page } from '$app/stores';
    import Icon from '@iconify/svelte';
    import type { DrawerSettings } from '@skeletonlabs/skeleton';
    import { AppBar, AppShell, Drawer, getDrawerStore} from '@skeletonlabs/skeleton';
    import { afterUpdate, onMount } from 'svelte';
    import { navbarMenu, sidebarMenu, type TabDefinition } from './navigation.tabs';
    import SettingMenu from './setting.menus.svelte';
    import Sidebar from './sidebar.svelte';
    export let userId = undefined;
    const navbarTabs: TabDefinition[] = navbarMenu(userId);
    const sidebarTabs: TabDefinition[] = sidebarMenu(userId);
    const drawerStore = getDrawerStore();

    function drawerLeftOpen(): void {
        const settings: DrawerSettings = {
            id: 'leftSidebar',
            position: 'left',
            width: '800px',
            bgDrawer: 'bg-primary-50 text-on-primary-token',
            bgBackdrop: 'bg-primary-500/50'
        };
        drawerStore.open(settings);
    }

    function drawerRightOpen(): void {
        const settings: DrawerSettings = {
            id: 'rightSidebar',
            position: 'right',
            width: '900px',
            bgDrawer:
                'bg-secondary-50 dark:bg-surface-900 border-l border-l-surface-200 dark:border-l-surface-700 flex flex-col gap-4 p-4'
        };
        drawerStore.open(settings);
    }

    function drawerRightClose(): void {
        drawerStore.close();
    }

    let showSidebar = false;
</script>

<AppShell class="w-full">
    <svelte:fragment slot="header">
        <AppBar
            gridColumns="grid-cols-3"
            background="bg-secondary-500"
            class="text-white"
            slotDefault="place-self-center"
            slotTrail="place-content-end"
        >
            <svelte:fragment slot="lead">
                <div class="flex  items-center">
                    <img class="block w-10 ml-2" src="/rean-logo-white.png" alt="REAN" />
                    <!-- <div class="relative ml-6 w-64 max-[450px]:w-40">
                        <input type="text" class="input pl-10" placeholder="Search" />
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Icon icon="material-symbols:search-rounded" class="text-lg text-primary-300" />
                        </div>
                    </div> -->
                </div>
            </svelte:fragment>
            <svelte:fragment slot="trail">
                <button
                    on:click={() => (showSidebar = !showSidebar)}
                    class="md:hidden btn btn-icon p-1 rounded hover:bg-white/10 text-white"
                >
                    <Icon icon="material-symbols:menu-rounded" class="text-3xl" />
                </button>

                <button
                    class="btn p-1 rounded hover:bg-white/10 text-white mr-6"
                    on:click={drawerRightOpen}
                >
                    <!-- <Icon icon="material-symbols:person-outline-rounded" class="text-3xl" /> -->
                    <img class="w-8 ml-2 text-lg invert dark:filter-none" src="/user.png" alt="" />
                </button>
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
    <svelte:fragment slot="sidebarLeft">
        <Sidebar {userId} bind:showSidebar />
    </svelte:fragment>
    <div class="m-4 md:m-8">
        <slot />
    </div>
    <svelte:fragment slot="footer">
        <p class="bg-secondary-500 text-center p-2">
            <a href="https://reanfoundation.org" class="!text-white">&#xa9; 2022 REAN Foundation</a>
        </p>
    </svelte:fragment>
</AppShell>

<Drawer>
    {#if $drawerStore.id === 'rightSidebar'}
        <SettingMenu on:click={drawerRightClose} on:logout />
    {:else if $drawerStore.id === 'leftSidebar'}
        <div class="grid justify-center w-60 space-y-4 mt-5">
            {#each sidebarTabs as t}
                <a
                    href={t.path}
                    class="hover:bg-surface-700 hover:text-white p-2 hover:no-underline text-start no-underline rounded-md text-md font-medium
                     {$page.url.pathname == t.path ? 'active: bg-surface-800 ' : 'text-white'}">{t.name}</a
                >
            {/each}
            {#each navbarTabs as t}
                <a
                    href={t.path}
                    class="hover:bg-surface-700 lg:hidden sm:first:hidden hover:text-white p-2 hover:no-underline text-start no-underline rounded-md text-md font-medium
                    {$page.url.pathname == t.path ? 'active: bg-surface-800 ' : 'text-white'}">{t.name}</a
                >
            {/each}
        </div>
    {:else}
        <p>(fallback contents)</p>
    {/if}
</Drawer>
