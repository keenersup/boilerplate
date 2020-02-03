import {useMediaQuery, useTheme} from "@material-ui/core";
import {Breakpoint} from '@material-ui/core/styles/createBreakpoints';

type Result = { variant: "standard" } | { variant: "outlined" }
type Hook = (type: "up" | "down", key: Breakpoint | number) => Result;

export const useBreakpoints: Hook = (type, key) => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints[type](key))
    return matches
        ? // or use const expression
        {variant: "standard"} :
        {variant: "outlined"}
}

