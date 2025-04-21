const { google } = require("googleapis");

async function scheduleGoogleMeet(oAuthToken, meetingDetails) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: oAuthToken });

  const calendar = google.calendar({ version: "v3", auth });

  const event = {
    summary: meetingDetails.title,
    description: meetingDetails.description,
    start: {
      dateTime: meetingDetails.startDateTime,
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: meetingDetails.endDateTime,
      timeZone: "Asia/Kolkata",
    },
    conferenceData: {
      createRequest: {
        requestId: `meet-${Date.now()}`,
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
      },
    },
    attendees: [
      { email: meetingDetails.mentorEmail },
      { email: meetingDetails.userEmail },
    ],
  };

  const response = await calendar.events.insert({
    calendarId: "primary",
    resource: event,
    conferenceDataVersion: 1,
  });

  return response.data.hangoutLink;
}
