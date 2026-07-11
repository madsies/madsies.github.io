import { Autocomplete, Box, Button, Card,  IconButton, TextField, Typography } from "@mui/material"
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useData } from "../shared/DataContext";
import { Link } from "react-router-dom";

type Captain = {
  id: string;
  name: string;
  budget: number;
  rank: string;
  team: string;
};

export type Player = {
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

const Heroes = [
    "Dva", "Domina", "Doomfist","Hazard","Junker Queen","Mauga","Orisa","Ramattra","Reinhardt","Roadhog","Sigma","Winston","Wrecking Ball","Zarya",
    "Ashe", "Anran", "Bastion", "Cassidy", "Echo", "Emre", "Freja", "Genji", "Hanzo", "Junkrat", "Mei", "Pharah", "Reaper", "Sierra", "Sojourn", "Soldier 76", "Sombra", "Symmetra", "Torbjorn", "Tracer", "Vendetta", "Venture",  "Widowmaker", "Shion",
    "Ana", "Baptiste", "Brigitte", "Illari", "Kiriko", "Lifeweaver", "Lucio", "Jetpack Cat", "Juno", "Mercy", "Mizuki", "Moira", "Wuyang", "Zenyatta"
]

const Roles = [
    "Damage", "Tank", "Support", "Flex"
]

const SecondaryRoles = [
    "None", "Both", "Damage", "Tank", "Support"
]

const Ranks = ["Bronze", "Silver", "Gold", "Platinum", "Diamond 5", "Diamond 4", "Diamond 3", "Diamond 2", "Diamond 1", 
            "Master 5", "Master 4", "Master 3", "Master 2", "Master 1", "GrandMaster 5", "GrandMaster 4", "GrandMaster 3", "GrandMaster 2", "GrandMaster 1",
            "Champion 5", "Champion 4", "Champion 3", "Champion 2", "Champion 1"];

export const Create = () =>
{
    const {captains, setCaptains, players, setPlayers} = useData();

    const handleDeleteCaptain = (id: string) => {
        setCaptains((prev: any[]) => prev.filter((c: { id: string; }) => c.id !== id));
    };

    const handleDeletePlayer = (id: string) => {
        setPlayers((prev: any[]) => prev.filter((c: { id: string; }) => c.id !== id));
    };

    const captainColumns: GridColDef[] = [
    {
        field: "name",
        headerName: "Name",

        flex: 1,
        editable: true,
    },
    {
        field: "budget",
        headerName: "Budget",
        type: "number",
        flex: 1,
        editable: true,
    },
    {
        field: "rank",
        headerName: "Rank",
        type: "singleSelect",
        flex: 1,
        editable: true,
        valueOptions: Ranks
    },
    {
        field: "team",
        headerName: "Team",
        flex: 1,
        editable: true,
        type: "singleSelect",
        valueOptions: ["DoughNotts", "CocoNotts", "HazelNotts", "PeaNotts", "No Team"]
    },
    {
        field: "actions",
        headerName: "",
        width:20,
        sortable: false,
        filterable: false,
        renderCell: (params, ) => {
            return (
            <IconButton
                onClick={() => handleDeleteCaptain(params.row.id)}>
                X
            </IconButton>
            );
        },
    }
    ];

    const playerColumns: GridColDef[] = 
    [
        {
            field: "name",
            headerName: "Name",
            flex: 2,
            editable: true,
        },
        {
            field: "pictureUrl",
            headerName: "pic",
            type: "string",
            flex: 1,
            editable:true
        },
        {
            field: "team",
            headerName: "Team",
            flex: 2,
            editable: true,
            type: "singleSelect",
            valueOptions: ["DoughNotts", "CocoNotts", "HazelNotts", "PeaNotts", "No Team"]
        },
        {
            field: "heroes",
            headerName:"Heroes",
            flex:3,
            editable: true,
            renderEditCell: (params) => {
                const value = Array.isArray(params.value) ? params.value : [];

                return (
                    <Autocomplete
                    multiple
                    options={Heroes}
                    value={value}
                    onChange={(_, newValue) => {
                        params.api.setEditCellValue({
                        id: params.id,
                        field: params.field,
                        value: newValue,
                        });
                    }}
                    renderInput={(paramsInput) => (
                        <TextField {...paramsInput} variant="standard" />
                    )}
                    sx={{ width: "100%" }}
                    />
                );
                }
        },
        {
            field: "rank",
            headerName: "Rank",
            type: "singleSelect",
            flex: 2,
            editable: true,
            valueOptions: Ranks
        },
        {
            field:"mainRole",
            headerName:"Main Role",
            flex:2,
            editable:true,
            type:"singleSelect",
            valueOptions:Roles
        },
        {
            field:"secondaryRoles",
            headerName:"Secondary Role(s)",
            flex:2,
            editable:true,
            type:"singleSelect",
            valueOptions:SecondaryRoles
        },
        {
            field:"funFact",
            headerName:"Fun Fact",
            flex:1, 
            editable:true,
            type:"string",
        },
        {
        field: "actions",
        headerName: "",
        width:20,
        sortable: false,
        filterable: false,
        renderCell: (params, ) => {
            return (
            <IconButton
                onClick={() => handleDeletePlayer(params.row.id)}>
                X
            </IconButton>
            );
        },
    }

    ]

    const handleProcessRowUpdate = (newRow: Captain) => {
    setCaptains((prev) =>
        prev.map((row) => (row.id === newRow.id ? newRow : row))
    );
    return newRow;
    };

    const handleProcessRowUpdatePlayer = (newRow: Player) => {
        setPlayers((prev) =>
            prev.map((row) => (row.id === newRow.id ? newRow : row))
        );
        console.log(players);
        return newRow;
    };


    return (<>
        <Box sx={{display:"flex", m:2, mx:7, gap:2}}>
            <Button component={Link} to={"/list"} variant="contained" color="secondary">View Players</Button>
            <Button component={Link} to={"/draft"} variant="contained" color="secondary">Start Draft</Button>
        </Box>
   
        <Box sx={{display:"flex", flexDirection:"row", maxWidth:"100%", justifyContent:"space-around", gap:2, height:"100%", mx:5}}>
            
            {/* Adding Captains */}
            <Card sx={{width:"30%", p:2, background:"#90e57199"}}>
                <Typography variant="h6">Captains ({captains.length})</Typography>
                <Button
                    onClick={() =>
                        setCaptains((prev: any) => [
                        ...prev,
                        {
                            id: crypto.randomUUID(),
                            name: "Captain Name",
                            budget: 1000000,
                            rank: "Bronze",
                            team: "DoughNotts",
                        },])}>
                    Add Captain
                </Button>
                <DataGrid
                    rows={captains}
                    columns={captainColumns}
                    processRowUpdate={handleProcessRowUpdate}/>
        </Card>

            {/* Adding Players */}
            <Card sx={{width:"65%", background:"#fe93bc99", p:2 }}>
                <Typography variant="h6">Players ({players.length})</Typography>
                 <Button
                    onClick={() =>
                        setPlayers((prev: any) => [
                        ...prev,
                        {
                            id: crypto.randomUUID(),
                            pictureUrl: "url here",
                            name: "Player Name",
                            team: "PeaNotts",
                            heroes: [],
                            mainRole: "Flex",
                            secondaryRoles: "None",
                            funFact: "Fun Fact",
                            rank: "Bronze",
                        },])}>
                    Add Player
                </Button>
                <DataGrid rows={players} columns={playerColumns} processRowUpdate={handleProcessRowUpdatePlayer}/>
            </Card>
        </Box>
         </>
    )
}