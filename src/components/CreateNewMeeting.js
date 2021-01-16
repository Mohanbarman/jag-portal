import React, {useState} from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {demoPlatforms} from "../Content";
import AddIcon from '@material-ui/icons/Add';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const CreateNewMeeting = () => {
  const [meetingName, setMeetingName] = useState('');
  const [platform, setPlatform] = useState(new Date(Date.now()));
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [link, setLink] = useState('');

  const _handleSubmit = () => {
    if (meetingName && platform && selectedDate && link) {
      console.log('Meeting name : ', meetingName);
      console.log('Platform : ', platform);
      console.log('Selected date : ', selectedDate);
      console.log('Link : ', link);
    }
  }

  return(
    <div className='create-new-meeting-wrapper'>
      <h4 className='dashboard-center-text-right'>Create new meeting</h4>
      <TextField
        label='Meeting name'
        value={meetingName}
        onChange={i => setMeetingName(i.target.value)}
        variant='standard'
        className='create-new-meeting-input-x3'
      />

      <FormControl>
        <InputLabel id="select-platform-input-label">Platform</InputLabel>
        <Select
          labelId="select-platform-input-label"
          value={platform}
          onChange={i => setPlatform(i.target.value)}
          placeholder='Select platform'
        >
          {demoPlatforms.map(i => (
            <MenuItem value={i}>{i}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          format="MM/dd/yyyy"
          margin="normal"
          label="Date"
          value={selectedDate}
          onChange={setSelectedDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

        <KeyboardTimePicker
          margin="normal"
          label="Time"
          value={selectedDate}
          onChange={setSelectedDate}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </MuiPickersUtilsProvider>

      <TextField
        label='Link'
        value={link}
        onChange={i => setLink(i.target.value)}
        variant='standard'
        className='create-new-meeting-input'
      />

      <Button
        className='create-new-meeting-btn'
        variant='contained'
        color='primary'
        endIcon={<AddIcon/>}
        onClick={_handleSubmit}
      >
        Create meeting
      </Button>
    </div>
  )
}

export default CreateNewMeeting;
