import { Box, Button, Card, Divider, Typography, TextField, InputAdornment } from "@mui/material";
import { useData } from "../shared/DataContext";
import { yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { RankIcon } from "./components/RankIcon";
import { PlayerRole } from "./components/PlayerRole";
import { PlayerCard } from "./components/PlayerCard";

interface Team {
    captain: string;
    captainRank: string;
    budget: number;
    players: DraftPlayer[];
}

interface DraftPlayer {
    name: string;
    rank: string;
    pictureUrl: string;
    team: string;
    heroes: string[];
    cost: number;
    mainRole: string;
    secondaryRole: string;
    funFact: string;
}

export const Draft = () => {
    const { captains, players } = useData();
    const [teams, setTeams] = useState<Team[]>([]);
    const [draftPlayers, setDraftPlayers] = useState<DraftPlayer[]>([]);
    const [activeAuction, setActiveAuction] = useState<boolean>(false);
    const [auctionPlayer, setAuctionPlayer] = useState<DraftPlayer>();
    const [auctionRound, setAuctionRound] = useState(1);
    
    const [bidAmount, setBidAmount] = useState<number>(0);

    useEffect(() => {
        if (!captains.length) return;

        const initialTeams: Team[] = captains.map((captain) => ({
            captain: captain.name,
            captainRank: captain.rank,
            budget: captain.budget,
            players: []
        }));

        setTeams(initialTeams);
    }, [captains]);

    useEffect(() => {
        if (!players.length) return;
        const initialPlayers: DraftPlayer[] = players.map((player) => ({
            name: player.name,
            rank: player.rank,
            cost: 0,
            pictureUrl: player.pictureUrl,
            team: player.team,
            heroes: player.heroes,
            mainRole: player.mainRole,
            secondaryRole: player.secondaryRoles, 
            funFact: player.funFact
        }));

        setDraftPlayers(initialPlayers);
    }, [players]);

    const draftPlayer = (player: DraftPlayer) => {
        setActiveAuction(true);
        setAuctionPlayer(player);
        setDraftPlayers(prev => prev.filter(p => p.name !== player.name));
    };

    const handleBuyPlayer = (captainName: string) => {
        if (!auctionPlayer) return;

        const actualCost = bidAmount * 1000;

        setTeams(prevTeams => 
            prevTeams.map(team => {
                if (team.captain === captainName) {
                    return {
                        ...team,
                        budget: team.budget - actualCost,
                        players: [...team.players, { ...auctionPlayer, cost: actualCost }]
                    };
                }
                return team;
            })
        );

    
        setAuctionRound(prev => prev + 1);
        setBidAmount(0);
        setAuctionPlayer(undefined);
        setActiveAuction(false);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", width: "100%", alignItems: "center", gap: 2, p: 2 }}>
                <Typography variant="h5" fontWeight="bold">Draft - Round {auctionRound}</Typography>
            </Box>

            <Box sx={{ display: "flex", width: "100%", mr: "auto" }}>
                {/* Left Side, Captains and Teams */}
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around", height: "90vh" }}>
                    {teams.map((team, i) => (
                        <Card key={i} sx={{ width: "350px", p: 2.5 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box>
                                    <Typography fontWeight="bold" variant="h6">
                                        {team.captain}
                                    </Typography>
                                    <span style={{ fontWeight: "bold", fontSize: 14 }}>
                                        {team.captainRank}
                                    </span>
                                </Box>
                                <Typography fontWeight="bolder" color={yellow[800]} textAlign={"center"} sx={{ justifyContent: "center" }}>
                                    £{team.budget.toLocaleString()}
                                </Typography>
                            </Box>
                            
                            <Typography variant="caption" color="text.secondary">
                                Players: {team.players.length}/6
                            </Typography>
                        </Card>
                    ))}
                </Box>

                {/* Center, Draft */}
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                    {auctionPlayer && (
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                            <PlayerCard
                                name={auctionPlayer?.name}
                                pictureUrl={auctionPlayer.pictureUrl}
                                team={auctionPlayer.team}
                                role={auctionPlayer?.mainRole}
                                secondary={auctionPlayer?.secondaryRole}
                                heroes={auctionPlayer.heroes}
                                rank={auctionPlayer?.rank}
                                fact={auctionPlayer.funFact}
                                large
                            />

                            <Box sx={{display:"flex", flexDirection:"column", alignItems: "center", gap:3}}>
                                {/* Bidding Bar */}
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt:"10vh" }}>
                                    <Typography variant="h6" fontWeight="bold">Current Bid:</Typography>
                                    <TextField
                                        type="number"
                                        size="small"
                                        variant="outlined"
                                        value={bidAmount === 0 ? '' : bidAmount}
                                        onChange={(e) => setBidAmount(Number(e.target.value))}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">£</InputAdornment>,
                                            endAdornment: <InputAdornment position="end">k</InputAdornment>,
                                        }}
                                        sx={{ width: "200px" }}
                                    />
                                </Box>


                                {/* Captain Buttons */}
                                <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                                    {teams.map((team, i) => (
                                        <Button
                                            key={i}
                                            disabled={team.players.length >= 6 || team.budget < (bidAmount * 1000)}
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleBuyPlayer(team.captain)}
                                        >
                                            Buy ({team.captain})
                                        </Button>
                                    ))}
                                </Box>
                            </Box>

                            
                        </Box>
                    )}
                </Box>

                {/* Right Side, Player List */}
                <Card sx={{ p: 2, width: "500px", maxHeight: "90vh", overflowY: "auto" }}>
                    <Typography fontWeight={"bold"} mb={2}>Available Players</Typography>
                    {draftPlayers.map((player) => (
                        <Box key={player.name}>
                            <Box sx={{ display: "flex", height: "35px", justifyContent: "space-between", alignItems: "center", p: 1 }}>
                                <Typography textAlign={"center"} sx={{ mr: "auto" }}>{player.name}</Typography>
                                <Box sx={{ display: "flex", mt: "30px", gap: .75 }}>
                                    <RankIcon rank={player.rank} small={true}></RankIcon>
                                    <PlayerRole role={player.mainRole} small={true} secondary={player.secondaryRole} />
                                </Box>
                                <Button 
                                    variant="contained" 
                                    onClick={() => draftPlayer(player)} 
                                    sx={{ my: 2, ml: 2 }}
                                    disabled={activeAuction}
                                >
                                    Draft
                                </Button>
                            </Box>
                            <Divider />
                        </Box>
                    ))}
                </Card>
            </Box>
        </Box>
    );
};