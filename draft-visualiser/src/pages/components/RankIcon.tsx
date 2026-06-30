import { Avatar } from "@mui/material"

interface RankProps
{
    rank: string;
}


export const RankIcon = ({ rank }: RankProps) => {
    if (typeof rank !== "string") return null;

    const width = 50;
    const height = 50;

    const rankLower = rank.toLowerCase();

    if (rankLower.startsWith("bronze")) {
        return <Avatar variant="square" src="/ranks/Badge_1_Bronze.webp" sx={{width:width, height:height}} />;
    }

    if (rankLower.startsWith("silver")) {
        return <Avatar variant="square" src="/ranks/Badge_2_Silver.webp" sx={{width:width, height:height}}/>;
    }

    if (rankLower.startsWith("gold")) {
        return <Avatar variant="square" src="/ranks/Badge_3_Gold.webp" sx={{width:width, height:height}}/>;
    }

    if (rankLower.startsWith("platinum")) {
        return <Avatar variant="square" src="/ranks/Badge_4_Platinum.webp" sx={{width:width, height:height}}/>;
    }

    if (rankLower.startsWith("diamond")) {
        return <Avatar variant="square" src="/ranks/Badge_5_Diamond.webp" sx={{width:width, height:height}}/>;
    }

    if (rankLower.startsWith("master")) {
        return <Avatar variant="square" src="/ranks/Badge_6_Master.webp" sx={{width:width, height:height}}/>;
    }

    if (rankLower.startsWith("grandmaster")) {
        return <Avatar variant="square" src="/ranks/Badge_7_Grandmaster.webp" sx={{width:width, height:height}}/>;
    }

    if (rankLower.startsWith("champion")) {
        return <Avatar variant="square" src="/ranks/Badge_8_Champion.webp" sx={{width:width, height:height}}/>;
    }

    return null;
};