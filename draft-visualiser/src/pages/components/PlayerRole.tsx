import { Avatar, Box } from "@mui/material";

interface PlayerRoleProps {
  role: string;
  secondary?: string;
}

const getRoleImage = (role: string) => `/roles/${role}.webp`;

export const PlayerRole = ({ role, secondary }: PlayerRoleProps) => {
  if (typeof role !== "string") return null;

  const width = 50;
  const height = 50;

  const remainingRoles = ["Damage", "Tank", "Support"].filter(
    (r) => r.toLowerCase() !== role.toLowerCase()
  );

  return (
    <Box sx={{ position: "relative", width: 50, height: 50 }}>
      <Avatar
        variant="square"
        src={getRoleImage(role)}
        sx={{ width, height }}
      />

      {/* One secondary role */}
      {(secondary && secondary != "None") &&
        secondary.toLowerCase() !== "both" && (
          <Avatar
            variant="square"
            src={getRoleImage(secondary)}
            sx={{
              position: "absolute",
              width: width / 2,
              height: height / 2,
              top: 0,
              left: width/1.5,
            }}
          />
        )}

      {/* Both remaining roles */}
      {secondary?.toLowerCase() === "both" && (
        <>
          <Avatar
            variant="square"
            src={getRoleImage(remainingRoles[0])}
            sx={{
              position: "absolute",
              width: width / 2, height: height / 2,top: 0, left: width/1.5,
            }}
          />
          <Avatar
            variant="square"
            src={getRoleImage(remainingRoles[1])}
            sx={{
              position: "absolute",
              width: width / 2,
              height: height / 2,
              top: height / 2,
              left: width/1.5,
            }}
          />
        </>
      )}
    </Box>
  );
};