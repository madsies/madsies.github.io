import { PlayerCard } from "./components/PlayerCard"

export const Draft = () =>
{
    return (
        <>
            <PlayerCard name={"madsies"} pictureUrl={"https://cdn.discordapp.com/attachments/639183855529623624/1521552447649087559/yuu_cropped.png?ex=6a453fa4&is=6a43ee24&hm=6fca7d2133774d524a5feff11460523190a385d78254ac8abb4ecbce39c77ddb&"} 
            team={"DoughNotts"} role={"Support"} heroes={["Ana", "Kiriko", "Wuyang"]} rank={"GrandMaster"} fact={"I am very very bad at overwatch"}/>
        </>
    )
}