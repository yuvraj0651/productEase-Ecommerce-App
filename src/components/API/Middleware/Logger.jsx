export const Logger = (store) => (next) => (action) => {
    console.log("Dispatching", action);
    console.log("Prev Store", store.getState());

    const result = next(action);

    console.log("Next State", store.getState());
    return result;
}