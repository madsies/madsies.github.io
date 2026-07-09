import { Avatar } from "@mui/material";

interface PlayerHeroProps
{
    hero: string;
}

export const PlayerHero = ({hero}:PlayerHeroProps) => 
{
    if (hero == null) return;
    return <Avatar variant="rounded" src={`/heroes/${hero}.webp`}/>
}