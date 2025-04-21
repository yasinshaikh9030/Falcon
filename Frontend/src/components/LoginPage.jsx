import React, { useEffect } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = "306981742336-9v2kbvmjs97uuegnf89p0iah2g4nvs5h.apps.googleusercontent.com"; // Your OAuth 2.0 client ID
const API_KEY = "AIzaSyBjjZAjsHVDMoO1NuA-Iver0bb_vXC5rnE";     // Your API key
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

const Googlemeet = () => {
    useEffect(() => {
        function start() {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                scope: SCOPES,
                discoveryDocs: [
                    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
                ],
            });
        }

        gapi.load("client:auth2", start);
    }, []);

    const handleCreateMeeting = () => {
        gapi.auth2.getAuthInstance().signIn().then(() => {
            const event = {
                summary: "Google Meet Test",
                description: "Testing Meet Link creation",
                start: {
                    dateTime: new Date().toISOString(),
                    timeZone: "Asia/Kolkata",
                },
                end: {
                    dateTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
                    timeZone: "Asia/Kolkata",
                },
                conferenceData: {
                    createRequest: {
                        requestId: "meet123",
                        conferenceSolutionKey: { type: "hangoutsMeet" },
                    },
                },
            };

            const request = gapi.client.calendar.events.insert({
                calendarId: "primary",
                resource: event,
                conferenceDataVersion: 1,
            });

            request.execute((event) => {
                console.log("Meeting Link:", event.hangoutLink);
                alert("Meeting created: " + event.hangoutLink);
            });
        });
    };

    return (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
            <h2>Create Google Meet Link</h2>
            <button onClick={handleCreateMeeting}>Create Meet</button>
        </div>
    );
};

export default Googlemeet;
