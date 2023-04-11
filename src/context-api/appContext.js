import {
	useEffect,
	createContext,
	useContext,
	useMemo,
	useReducer,
	useState
} from "react";

import { appReducer, initialState } from "./appReducer";

const AppContext = createContext();



export function AppWrapper({ children }) {
	const [ state, dispatch ] = useReducer(appReducer, initialState);
	const contextValue = useMemo(() => {
		return { state, dispatch };
	}, [state, dispatch]);

	return (
		<AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
	);
}

export function useAppContext() {
	//const 
	return useContext(AppContext);
}
