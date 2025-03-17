import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export const MeetingPage = () => {
    const {roomId}=useParams();
    const [openInterviewDialog, setOpenInterviewDialog] = useState(false);
    const [selectedApplicantId, setSelectedApplicantId] = useState(null);
    const [acceptedApplicants, setAcceptedApplicants] = useState(new Set());

    const inviteForInterview = (applicantId) => {
        setSelectedApplicantId(applicantId);
        setOpenInterviewDialog(true); // Open interview invite dialog
    };
    
    const myMeeting=async(element)=>{
        const appID=1193127105;
        const serverSecret="61b85c0133efa9995bdf607313f305f2";
        const kitToken=ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,roomId,Date.now().toString(),"Admin");
        const zc=ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container:element,
            sharedLinks:[
                {
                    name:"Copy Link",
                    url:`http://localhost:5173/meeting/${roomId}`
                }
            ],
            scenario:{
                mode:ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton:true,
        })
      }
    return(
        <div>
            <div ref={myMeeting}/>
            
        </div>
    )
};