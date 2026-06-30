import { Avatar } from "@mui/material";


interface PlayerRoleProps
{
    role: string;
}

export const PlayerRole = ({role}:PlayerRoleProps) =>
{
    if (typeof role !== "string") return null;

    const width = 50;
    const height = 50;

    var roleLower = role.toLowerCase();

    if (roleLower == "damage")
    {
        return <Avatar variant="square" src="roles/Damage.webp" sx={{width:width, height:height}} />;
    }
    if (roleLower == "tank")
    {
        return <Avatar variant="square" src="roles/Tank.webp" sx={{width:width, height:height}} />;
    }
    if (roleLower == "support")
    {
        return <Avatar variant="square" src="roles/Support.webp" sx={{width:width, height:height}} />;
    }
    else
    {
        return <Avatar variant="square" src="roles/flex.svg" sx={{width:width, height:height}} />;
    }
}