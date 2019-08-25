import Tooltip from '@material-ui/core/Tooltip';
import { withStyles} from '@material-ui/core/styles'

export const TooltipHelper = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: '#fff',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);