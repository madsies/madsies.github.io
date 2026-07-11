import { Box, Button, Card, Divider, Typography, TextField, InputAdornment } from "@mui/material";
import { useData } from "../shared/DataContext";
import { yellow, blue } from "@mui/material/colors";
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

const teamCols = ["#ff444477", "#44ff4477", "#4444ff77", "#aa44aa77", "#44aaaa77", "#aaaa4477"]

export const Draft = () => {
    const { captains, players } = useData();
    const [teams, setTeams] = useState<Team[]>([]);
    const [draftPlayers, setDraftPlayers] = useState<DraftPlayer[]>([]);
    const [activeAuction, setActiveAuction] = useState<boolean>(false);
    const [auctionPlayer, setAuctionPlayer] = useState<DraftPlayer>();
    const [auctionRound, setAuctionRound] = useState(1);
    const [currentPickIndex, setCurrentPickIndex] = useState(0);
    
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
        setBidAmount(10);
    };

    const handleBuyPlayer = (captainName: string) => {
        if (!auctionPlayer) return;

        const actualCost = bidAmount * 1000;

        setTeams(prevTeams => {
            const updatedTeams = prevTeams.map(team => {
                if (team.captain === captainName) {
                    return {
                        ...team,
                        budget: team.budget - actualCost,
                        players: [...team.players, { ...auctionPlayer, cost: actualCost }]
                    };
                }
                return team;
            });

            // Find next team that isn't full
            let next = (currentPickIndex + 1) % updatedTeams.length;

            while (
                updatedTeams[next].players.length >= TEAM_SIZE &&
                next !== currentPickIndex
            ) {
                next = (next + 1) % updatedTeams.length;
            }

            setCurrentPickIndex(next);

            return updatedTeams;
        });

        
        setAuctionRound(prev => prev + 1);
        setBidAmount(0);
        setAuctionPlayer(undefined);
        setActiveAuction(false);
    };

    const TEAM_SIZE = 5; // Not Counting captain

    const currentCaptainPicking =
    currentPickIndex >= 0 && teams[currentPickIndex]
        ? teams[currentPickIndex].captain
        : "Draft Complete";

    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {/* Top Bar with Round and Current Pick */}
            <Box sx={{ display: "flex", width: "100%", alignItems: "baseline", gap: 3, p: 2, mb: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h4" fontWeight="bold">Draft</Typography>
                <Typography variant="h6" color="text.secondary">Round {auctionRound}</Typography>
                {teams.length > 0 && (
                    <Typography variant="h6" color={blue[600]} sx={{ ml: "auto", fontWeight: "bold" }}>
                        Now Picking: {currentCaptainPicking}
                    </Typography>
                )}
            </Box>

            <Box sx={{ display: "flex", width: "100%", mr: "auto" }}>
                {/* Left Side, Captains and Teams */}
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around", height: "90vh" }}>
                    {teams.map((team, i) => (
                        <Card 
                            key={i} 
                            sx={{ 
                                width: "350px", 
                                p: 2.5,
                                border: i === currentPickIndex ? `2px solid ${blue[900]}` : "none",
                                boxShadow: i === currentPickIndex ? 6 : 1,
                                background:teamCols[i]
                            }}
                        >
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box>
                                    <Typography fontWeight="bold" variant="h6" color={i === currentPickIndex ? "whitesmoke" : "text.primary"}>
                                        {team.captain}
                                        {i === currentPickIndex && " (Picking)"}
                                    </Typography>
                                </Box>
                                <Typography fontWeight="bolder" color={yellow[600]} textAlign={"center"} sx={{ justifyContent: "center" }}>
                                    £{team.budget.toLocaleString()}
                                </Typography>
                            </Box>
                                <Typography variant="subtitle2" color="text.secondary" lineHeight={1} padding={0} fontWeight={"bold"}>Players ({team.players.length}/{TEAM_SIZE})</Typography>
                            {team.players.map((player) => (
                                <Typography variant="subtitle2" color="text.secondary" lineHeight={1} padding={0}>
                                    {player.name} <span style={{color:yellow[600], fontWeight:700}}>£{player.cost}</span>
                                </Typography>
                            ))}
                            
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

                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                                {/* Bidding Bar */}
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: "10vh" }}>
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
                                            disabled={team.players.length >= TEAM_SIZE || team.budget < (bidAmount * 1000)}
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
                <Card sx={{ p: 2, width: "600px", maxHeight: "90vh", overflowY: "auto", background:"#99999944" }}>
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