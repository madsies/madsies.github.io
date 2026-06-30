import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

type Captain = {
  id: string;
  name: string;
  budget: number;
  rank: string;
  team: string;
};

type Player = {
  id: string;
  pictureUrl: string;
  name: string;
  team: string;
  heroes: string[];
  mainRole: string;
  secondaryRoles: string;
  funFact: string;
  rank: string;
};

interface DataContextValue
{
    captains: Captain[];
    setCaptains: Dispatch<SetStateAction<Captain[]>>;
    players: Player[];
    setPlayers: Dispatch<SetStateAction<Player[]>>;
}

const DataContext = createContext<DataContextValue | null>(null);

const STORAGE_KEY = "draft-data";

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [captains, setCaptains] = useState<Captain[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved).captains : [];
    });

    const [players, setPlayers] = useState<Player[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved).players : [];
    });

    // save whenever data changes
    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ captains, players })
        );
    }, [captains, players]);

    return (
        <DataContext.Provider value={{
            captains,
            setCaptains,
            players,
            setPlayers
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("error, data could not be fetched?");
  }
  return context;
}

