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
    large?: boolean;
}

export const PlayerCard = ({name, pictureUrl, team, role, secondary, heroes, rank, fact, large}:PlayerCardProps) =>
{
    return (
        <Card  sx={{py:2, px:1.5, m:2, alignItems:"center", width:"240px", cornerShape: "scoop", borderRadius:"25px", scale: large ? 1.5 : 1,
        background:"linear-gradient(180deg,rgba(33, 143, 254, 1) 20%, rgba(150, 155, 135, 1) 60%, rgba(249, 158, 26, 1) 100%);"}}>
            <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", gap:1}}>
                <Typography variant="h5" fontWeight={"bold"}>{name}</Typography>
                <Box sx={{display:"flex"}}>
                    <Avatar variant="rounded" imgProps={{onError: () => console.error("Picture failed:", pictureUrl),}}sx={{width:125, height:125,maskImage:
    "linear-gradient(to right, transparent, black 10%, black 90%, transparent), linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
  maskComposite: "intersect",
  WebkitMaskImage:
    "linear-gradient(to right, transparent, black 10%, black 90%, transparent), linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",}} src={pictureUrl}></Avatar>
                    <Box sx={{pl:2, display:"flex", flexDirection:"column", gap:2, justifyContent:"center"}}>   
                        <RankIcon rank={rank} small={false}/>
                        <PlayerRole role={role} secondary={secondary} small={false}/>
                    </Box>
                </Box>
            </Box>
            <Typography variant="subtitle1" fontWeight={"bold"} textAlign={"center"}>{team == "No Team" ? "‎ " : team}</Typography>
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