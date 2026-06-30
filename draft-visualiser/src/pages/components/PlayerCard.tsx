import { Avatar, Box, Card, Divider, Typography } from "@mui/material";
import { RankIcon } from "./RankIcon";
import { PlayerRole } from "./PlayerRole";
import { PlayerHero } from "./PlayerHero";


interface PlayerCardProps 
{
    name: string;
    pictureUrl: string;
    team: string;
    role: string;
    secondary: string;
    heroes: string[];
    rank: string;
    fact: string;
}

export const PlayerCard = ({name, pictureUrl, team, role, secondary, heroes, rank, fact}:PlayerCardProps) =>
{
    return (
        <Card  sx={{py:2, px:1.5, m:2, alignItems:"center", width:"240px", cornerShape: "scoop", borderRadius:"25px",
        background:"linear-gradient(180deg,rgba(33, 143, 254, 1) 20%, rgba(150, 155, 135, 1) 60%, rgba(249, 158, 26, 1) 100%);"}}>
            <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", gap:1}}>
                <Typography variant="h5" fontWeight={"bold"}>{name}</Typography>
                <Box sx={{display:"flex"}}>
                    <Avatar variant="rounded" sx={{width:125, height:125}} src={pictureUrl}></Avatar>
                    <Box sx={{pl:2, display:"flex", flexDirection:"column", gap:2, justifyContent:"center"}}>   
                        <RankIcon rank={rank}/>
                        <PlayerRole role={role} secondary={secondary}/>
                    </Box>
                </Box>
            </Box>
            <Typography variant="subtitle1" fontWeight={"bold"} textAlign={"center"}>{team}</Typography>
            <Divider/>
            <Box sx={{display:"flex", justifyContent:"space-between", m:1}}>
                {heroes.map((hero) =>
                (
                    <PlayerHero hero={hero}/>
                ))}
            </Box>
            <Divider/>
            <Typography variant="subtitle2" textAlign={"center"} paddingTop={1} paddingX={1}>
                {fact}
            </Typography>
            
        </Card>
    )
}