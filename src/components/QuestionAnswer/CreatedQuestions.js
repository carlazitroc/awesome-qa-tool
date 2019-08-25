import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ExpandMoreIcon } from '@material-ui/icons/ExpandMore'
import {
  DeleteOutlined,
  CreateOutlined,
  Sort
} from '@material-ui/icons'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  Typography,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper
} from '@material-ui/core'
import { TooltipHelper } from '../TooltipHelper'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  topHeader: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    cursor: "pointer"
  },
  iconSmall: {
    fontSize: 20,
    marginRight: theme.spacing(1),
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
  },
  buttonGrid: {
    marginRight: theme.spacing(1),
  },
  noQuestionInfo: {
    padding: '15px',
    backgroundColor: '#ffe6e6',
    color: '#f02056'
  }
}));

const createdQuestionHelper = `Here you can find created questions and their answer`;

export default function CreatedQuestions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false)
  const questionsCount = props.questions.length

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  const handleEdit = question => (event) => {
    event.preventDefault()
    props.handleEditQuestion(question)
  }

  const handleDelete = questionId => (event) => {
    event.preventDefault()
    props.handleRemoveQuestion(questionId)
  }

  return (
    <div className={classes.root}>
      <TooltipHelper title={createdQuestionHelper} placement="bottom-start">
        <Typography variant="h6" className={classes.topHeader}>
          Created Questions
        </Typography>
      </TooltipHelper>

      {questionsCount === 0 ?
        <Paper className={classes.noQuestionInfo}>
          <Typography>
            No questions yet. :(
          </Typography>
        </Paper>
        : null}

      {props.questions && props.questions.map(question =>
        <ExpansionPanel key={question.id} expanded={expanded === question.id} onChange={handleChange(question.id)}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header">
            <Typography className={classes.heading}>{question.question}</Typography>
          </ExpansionPanelSummary>
          <Divider />
          <ExpansionPanelDetails>
            <Typography>
              {question.answer}
            </Typography>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <IconButton
              aria-label="edit"
              color="primary"
              className={classes.buttonIcon}
              onClick={handleEdit(question)}>
              <CreateOutlined />
            </IconButton>
            <IconButton
              aria-label="delete"
              color="secondary"
              className={classes.buttonIcon}
              onClick={handleDelete(question.id)}>
              <DeleteOutlined />
            </IconButton>
          </ExpansionPanelActions>
        </ExpansionPanel>
      )}

      {questionsCount > 0 ?
        <div className={classes.buttonContainer}>
          <Grid container spacing={2}>
            <Grid item sm={5} xs={12} className={classes.buttonGrid}>
              <Button
                fullWidth
                variant="contained"
                size="medium"
                color="primary"
                onClick={props.handleSortQuestions}>
                <Sort className={classes.iconSmall} />
                Sort Questions
            </Button>
            </Grid>
            <Grid item sm={5} xs={12} className={classes.buttonGrid}>
              <Button
                fullWidth
                variant="contained"
                size="medium"
                color="secondary"
                onClick={props.handleRemoveQuestions}>
                <DeleteOutlined className={classes.iconSmall} />
                Remove Questions
            </Button>
            </Grid>
          </Grid>


        </div>
        : null}
    </div>
  );
}

