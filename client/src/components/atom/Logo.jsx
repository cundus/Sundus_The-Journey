import { Box, Image } from "@chakra-ui/react";
import LogoIcon from "../../assets/IconLogoJourney.svg";
import LogoIconBlack from "../../assets/IconBlack.svg";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function Logo(props) {
  const { state } = useContext(AppContext);
  return (
    <Box {...props}>
      <Image src={!state.isLogin ? LogoIcon : LogoIconBlack} alt="logo" />
    </Box>
  );
}
