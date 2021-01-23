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
  InputLabel, FormHelperText,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {SEVERITY, utilsContext} from "../context/UtilsContext";
import {CREATE_MEETING} from "../graphql/meetingSchemas";
import {useMutation} from "@apollo/client";
import {validateUrl} from "../Utils";


const CreateNewMeeting = () => {
  const [meetingName, setMeetingName] = useState('');
  const [platform, setPlatform] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [link, setLink] = useState('');
  const {setUpcomingMeetings, displayModal} = useContext(utilsContext);
  const [createMeeting] = useMutation(CREATE_MEETING);


  const _handleSubmit = async () => {
    if (!meetingName && !platform && !validateUrl(link)) {
      displayModal('Form contains error', SEVERITY.ERROR);
      return 0;
    }

    if (selectedDate < new Date(Date.now())) {
      displayModal('Meeting can\'t be scheduled for past', SEVERITY.ERROR);
      return 0;
    }

    try {
      const meeting = {
        title: meetingName,
        scheduledTime: selectedDate,
        platform: platform,
        link: link,
      }
      const res = await createMeeting({ variables: meeting});

      setUpcomingMeetings(p => [ res?.data?.createMeeting, ...p]) // Appending created meeting to the meetings array
      displayModal('Meeting created successfully', SEVERITY.SUCCESS);

      // Clear all fields
      setMeetingName('');
      setPlatform('');
      setLink('');

    } catch (e) {
      console.log(e.message);
      displayModal(e.message, SEVERITY.ERROR);
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
        error={meetingName.length < 1}
        helperText={meetingName.length < 1 ? 'Meeting name should\'t be empty' : ''}
      />

      <FormControl>
        <InputLabel id="select-platform-input-label" error={platform.length < 1}>Platform</InputLabel>
        <Select
          labelId="select-platform-input-label"
          value={platform}
          onChange={i => setPlatform(i.target.value)}
          placeholder='Select platform'
          error={platform.length < 1}
        >
          {demoPlatforms.map(i => (
            <MenuItem value={i}>{i}</MenuItem>
          ))}
        </Select>
        {platform.length < 1 && (
          <FormHelperText error={platform.length < 1}>
            Please select a platform
          </FormHelperText>
        )}
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
        error={!validateUrl(link)}
        helperText={!validateUrl(link) ? 'Please enter a valid url' : ''}
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
