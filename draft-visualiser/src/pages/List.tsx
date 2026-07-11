import { Box, Button } from "@mui/material";
import { useData } from "../shared/DataContext";
import { PlayerCard } from "./components/PlayerCard";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import { toPng } from "html-to-image";
import { useRef } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export const List = () =>
{
    const {players} = useData();
    const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const waitForImages = (element: HTMLElement) =>
        Promise.all(
            Array.from(element.querySelectorAll("img")).map((img) => {
            if (img.complete) return Promise.resolve();
            return new Promise((res) => {
                img.onload = res;
                img.onerror = res;
            });
            })
     );

    const exportAllCards = async () => {
        const zip = new JSZip();

        for (const player of players) {
            try
            {
            const node = cardRefs.current[player.name];
            if (!node) continue;

            await waitForImages(node);

            const dataUrl = await toPng(node, {
            cacheBust: true,
            pixelRatio: 2,
            });

            // convert base64 -> blob
            const res = await fetch(dataUrl);
            const blob = await res.blob();

            zip.file(`player-${player.name}.png`, blob);
            } catch (err) {
                console.error("Failed exporting", player.name, err);
            }
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });

        saveAs(zipBlob, "player-cards.zip");
        };

    return (
        <>
            <Box sx={{display:"flex", m:2, mt:5, gap:2}}>
                <Button component={Link} to={"/"} variant="contained" color="secondary">Back</Button>
                <Button variant="contained" onClick={exportAllCards}>Export All Cards</Button>
            </Box>
            
            <Grid2 container sx={{display:"flex", my:4}}>
                {players.map((player) => (
                        <div
                            key={player.name}
                            ref={(el) => {
                                cardRefs.current[player.name] = el;
                            }}
                        >
                            <PlayerCard
                                name={player.name}
                                pictureUrl={player.pictureUrl}
                                team={player.team}
                                role={player.mainRole}
                                secondary={player.secondaryRoles}
                                heroes={player.heroes}
                                rank={player.rank}
                                fact={player.funFact}
                            />
                        </div>
                    ))}
                
            </Grid2>
        </>
    )
}