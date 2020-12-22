import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

export const MobStyledLink = withStyles({
    root: {
        cursor: 'pointer',
        color: '#ffffff',
    },
})(Link)

export const MobStyledBreadcrumbs = withStyles({
    root: {
        width: '100%',
    },
    ol: {
        justifyContent: 'center',
        color: '#ffffff',
    }
})(Breadcrumbs);