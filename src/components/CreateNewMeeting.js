import React, {useContext, useState} from 'react';
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
import {utilsContext} from "../context/UtilsContext";


const CreateNewMeeting = () => {
  const [meetingName, setMeetingName] = useState('');
  const [platform, setPlatform] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [link, setLink] = useState('');
  const {setUpcomingMeetings, setModalState} = useContext(utilsContext);

  const _handleSubmit = () => {
    if (meetingName && platform && selectedDate && link) {
      const meeting = {
          id: Date.now(),
          name: meetingName,
          date: selectedDate,
          platform: platform,
          link: link,
      }

      // append meeting to current meetings list
      setUpcomingMeetings(p => [ ...p, meeting])

      // Display modal
      setModalState({
        isOpen: true,
        severity: 'info',
        content: 'New meeting successfully added',
      })

      // Clear all fields
      setMeetingName('');
      setPlatform('');
      setLink('');
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
