import { writable } from 'svelte/store';
const data = [];
// function to sort the input array 
function formatInput(input) {
    return input
        .sort((a, b) => a.Value < b.Value ? 1 : -1)
        .map(({Key, Value}, index) => ({
            Key,
            Value,
        }));
}

function createItems(initialItems) {
    const { subscribe, set, update } = writable(initialItems);

    return {
        subscribe,
        // create: add an object for the item at the end of the store's array
        create: (Key, Value) => update(n => {
            n = [...n, {
                Key: Key, Value: Value
            }];
            return formatInput(n);
        }),
        // update: increase the value of the selected item
        update: (Key, Value) => update(n => {
            const index = n.findIndex(item => item.Key === Key);
            n[index].Value += Value;
            return formatInput(n);
        }),
        // delete: remove the item from the array
        delete: (Key) => update(n => {
            const index = n.findIndex(item => item.Key === Key);
            n = [...n.slice(0, index), ...n.slice(index + 1)];
            return formatInput(n);
        })
    }
}

export const items = createItems(formatInput(data));