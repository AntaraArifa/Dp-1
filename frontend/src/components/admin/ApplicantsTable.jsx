import { MoreHorizontal } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import { Popover } from '@radix-ui/react-popover';
import { PopoverContent, PopoverTrigger } from '../ui/popover';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import InterviewInviteDialog from './InterviewInviteDialog';
import CreateMeetingDialog from './CreateMeetingDialog';
import { removeApplicant } from '@/redux/applicationSlice';

const shortlistingStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const [acceptedApplicants, setAcceptedApplicants] = useState(new Set());
  const [openInterviewDialog, setOpenInterviewDialog] = useState(false);
  const [openMeetingDialog, setOpenMeetingDialog] = useState(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const [statusForMeeting, setStatusForMeeting] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Applicants:', applicants);
    console.log('First Applicant:', Array.isArray(applicants?.applications ?? applicants)
      ? (applicants?.applications ?? applicants)[0]
      : null);
  }, [applicants]);

  const inviteForInterview = (applicantId) => {
    setSelectedApplicantId(applicantId);
    setOpenInterviewDialog(true);
  };

  const createMeeting = (applicantId) => {
    setSelectedApplicantId(applicantId);
    setOpenMeetingDialog(true);
  };

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        if (status === 'Accepted') {
          setAcceptedApplicants((prev) => {
            const newSet = new Set(prev);
            newSet.add(id);
            return newSet;
          });
          setStatusForMeeting(status);
        } else if (status === 'Rejected') {
          dispatch(removeApplicant(id));
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating status.');
    }
  };

  const applicationList = Array.isArray(applicants?.applications)
    ? applicants.applications
    : Array.isArray(applicants)
    ? applicants
    : [];

  return (
    <div>
      <Table>
        <TableCaption>A list of recent applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicationList.length > 0 ? (
            applicationList.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item.applicant.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.applicant.profile.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt?.split('T')[0] ?? 'NA'}
                </TableCell>
                <TableCell className="float-right cursor-pointer">
                  <button
                    onClick={() => inviteForInterview(item?.applicant?._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Invite for Interview
                  </button>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent>
                      {shortlistingStatus.map((status, index) => (
                        <div
                          onClick={() => statusHandler(status, item._id)}
                          key={index}
                          className="flex w-fit items-center my-2 cursor-pointer"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                      {statusForMeeting === 'Accepted' && (
                        <button
                          onClick={() => createMeeting(item?.applicant?._id)}
                          className="bg-green-500 text-white px-2 py-1 rounded mt-2"
                        >
                          Create Meeting
                        </button>
                      )}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <InterviewInviteDialog
        open={openInterviewDialog}
        setOpen={setOpenInterviewDialog}
        applicantId={selectedApplicantId}
      />
      {openMeetingDialog && (
        <CreateMeetingDialog
          open={openMeetingDialog}
          setOpen={setOpenMeetingDialog}
          applicantId={selectedApplicantId}
        />
      )}
    </div>
  );
};

export default ApplicantsTable;
