import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Checkbox,
  Grid, 
  FormControlLabel,
  TextField,
  Button,
  Typography
} from '@material-ui/core'
import { TooltipHelper } from '../TooltipHelper'


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  newQuestionHeader: {
    marginTop: theme.spacing(3),
    cursor: "pointer"
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const newQuestionHelper = `Here you can create new questions and their answer`;

function QuestionAnswerForm(props) {
  const classes = useStyles();

  return (
    <div>
      <TooltipHelper title={newQuestionHelper} placement="bottom-start">
        <Typography variant="h6" className={classes.newQuestionHeader}>
          {props.editQuestion ? 'Edit Question' : 'Create New Question'}
        </Typography>
      </TooltipHelper>

      <form className={classes.container} onSubmit={props.handleSubmit}>

        <TextField
          id="question"
          label="Question"
          fullWidth
          name="question"
          error={props.errorQuestion}
          helperText={props.errorQuestion ? 'Please input a question' : ' '}
          value={props.question}
          onChange={props.handleChange}
        />

        <TextField
          id="answer"
          label="Answer"
          fullWidth
          multiline
          rows="4"
          name="answer"
          error={props.errorAnswer}
          helperText={props.errorAnswer ? 'Please input an answer' : ' '}
          value={props.answer}
          onChange={props.handleChange}
        />

        <Grid xs={12} item>
          <FormControlLabel control={
            <Checkbox
              checked={props.questionDelay}
              name="questionDelay"
              color="primary"
              onChange={props.handleChange} />
          }
            label="5 Second Delay"
          />
        </Grid>

        <Grid xs={12} item>
          <Button type="submit" variant="contained" size="medium" color="primary" className={classes.button}>
            {props.editQuestion ? 'Edit Question' : 'Create New Question'}
          </Button>
        </Grid>

      </form>
    </div>
  )
}


export default QuestionAnswerForm