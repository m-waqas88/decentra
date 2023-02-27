import { createGlobalState } from "react-hooks-global-state";
const { setGlobalState, getGlobalState, useGlobalState } = createGlobalState({
    accessToken: "",
    connectedAccount: "",
});

export {
    setGlobalState,
    getGlobalState,
    useGlobalState,
}