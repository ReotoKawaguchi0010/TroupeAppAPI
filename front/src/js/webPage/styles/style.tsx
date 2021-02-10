import { withStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

const pcStyles = {
    root: {
        width: '100%',
    },
    ol: {
        justifyContent: 'center',
        color: '#ffffff',
    }
}

const mobStyles = {
    root: {
        width: '100%',
    },
    ol: {
        justifyContent: 'center',
        color: '#ffffff',
        fontSize: '32px'
    }
}

export const StyledBreadcrumbs = withStyles((theme) => ({
    [theme.breakpoints.between('md', 'xl')]: pcStyles,
    [theme.breakpoints.between('sm', 'md')]: mobStyles,
}))(Breadcrumbs);
