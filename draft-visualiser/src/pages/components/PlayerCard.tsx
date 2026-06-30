import { Avatar, Box, Card, Typography } from "@mui/material";
import { RankIcon } from "./RankIcon";
import { PlayerRole } from "./PlayerRole";


interface PlayerCardProps 
{
    name: string;
    pictureUrl: string;
    team: string;
    role: string;
    heroes: string[];
    rank: string;
}

export const PlayerCard = ({name, pictureUrl, team, role, heroes, rank}:PlayerCardProps) =>
{
    return (
        <Card color={"primary"} sx={{p:2, m:2, width:"fit-content", alignItems:"center"}}>
            <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <Typography variant="h5" fontWeight={"bold"}>{name}</Typography>
                <Box sx={{display:"flex"}}>
                    <Avatar variant="square" sx={{width:125, height:125}} src={pictureUrl}></Avatar>
                    <Box sx={{pl:1.5, display:"flex", flexDirection:"column", gap:2, justifyContent:"center"}}>   
                        <RankIcon rank={rank}/>
                        <PlayerRole role={role}/>
                    </Box>
                </Box>
            </Box>
            <Typography variant="subtitle1" fontWeight={"bold"} textAlign={"center"}>{team}</Typography>
            <Box sx={{display:"flex"}}>

            </Box>
            
        </Card>
    )
}