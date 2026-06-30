import { Box } from "@mui/material";
import { useData } from "../shared/DataContext";
import { PlayerCard } from "./components/PlayerCard"

export const Draft = () =>
{
    const {players} = useData();

    return (
        <Box sx={{display:"flex"}}>
            {players.map((player) => (
                <PlayerCard
                    key={player.id}
                    name={player.name}
                    pictureUrl={player.pictureUrl}//"https://cdn.discordapp.com/attachments/639183855529623624/1521552447649087559/yuu_cropped.png?ex=6a453fa4&is=6a43ee24&hm=6fca7d2133774d524a5feff11460523190a385d78254ac8abb4ecbce39c77ddb&"
                    team={player.team}
                    role={player.mainRole}
                    secondary={player.secondaryRoles}
                    heroes={player.heroes}
                    rank={player.rank}
                    fact={player.funFact}
                />
            ))}
            
        </Box>
    )
}