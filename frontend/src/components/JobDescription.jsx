import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, Users, DollarSign, Briefcase, Clock } from 'lucide-react';

import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    
    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            console.log(res.data);
            if (res.data.success) {
                setIsApplied(true);
                const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updateSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
    
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
            
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id])

    return (
        <div className='max-w-4xl mx-auto my-8 px-4'>
            {/* Header Section */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6'>
                <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6'>
                    <div className='flex-1'>
                        <h1 className='text-3xl font-bold text-gray-900 mb-4'>{singleJob?.title}</h1>
                        <div className='flex flex-wrap items-center gap-3'>
                            <Badge className='bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 font-medium px-3 py-1.5'>
                                <Briefcase className="w-3.5 h-3.5 mr-1.5" />
                                {singleJob?.position} Positions
                            </Badge>
                            <Badge className='bg-red-50 text-red-700 hover:bg-red-100 border-red-200 font-medium px-3 py-1.5'>
                                <Clock className="w-3.5 h-3.5 mr-1.5" />
                                {singleJob?.jobType}
                            </Badge>
                            <Badge className='bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200 font-medium px-3 py-1.5'>
                                <DollarSign className="w-3.5 h-3.5 mr-1.5" />
                                {singleJob?.salary}
                            </Badge>
                        </div>
                    </div>
                    
                    <div className='flex-shrink-0'>
                        <Button 
                            onClick={isApplied ? null : applyJobHandler} 
                            disabled={isApplied} 
                            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                                isApplied 
                                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200 hover:bg-gray-100' 
                                    : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                            }`}
                        >
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Job Details Section */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200'>
                    Job Details
                </h2>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-6'>
                        <div className='flex items-start gap-4'>
                            <div className='flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center'>
                                <Briefcase className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className='flex-1'>
                                <h3 className='font-semibold text-gray-900 mb-1'>Role</h3>
                                <p className='text-gray-600'>{singleJob?.title}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-4'>
                            <div className='flex-shrink-0 w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center'>
                                <MapPin className="w-5 h-5 text-green-600" />
                            </div>
                            <div className='flex-1'>
                                <h3 className='font-semibold text-gray-900 mb-1'>Location</h3>
                                <p className='text-gray-600'>{singleJob?.location}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-4'>
                            <div className='flex-shrink-0 w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center'>
                                <DollarSign className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className='flex-1'>
                                <h3 className='font-semibold text-gray-900 mb-1'>Salary</h3>
                                <p className='text-gray-600'>{singleJob?.salary}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-4'>
                            <div className='flex-shrink-0 w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center'>
                                <Clock className="w-5 h-5 text-orange-600" />
                            </div>
                            <div className='flex-1'>
                                <h3 className='font-semibold text-gray-900 mb-1'>Experience</h3>
                                <p className='text-gray-600'>{singleJob?.experience}</p>
                            </div>
                        </div>
                    </div>

                    <div className='space-y-6'>
                        <div className='flex items-start gap-4'>
                            <div className='flex-shrink-0 w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center'>
                                <Users className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div className='flex-1'>
                                <h3 className='font-semibold text-gray-900 mb-1'>Total Applicants</h3>
                                <p className='text-gray-600'>{singleJob?.applications?.length}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-4'>
                            <div className='flex-shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center'>
                                <Calendar className="w-5 h-5 text-red-600" />
                            </div>
                            <div className='flex-1'>
                                <h3 className='font-semibold text-gray-900 mb-1'>Posted Date</h3>
                                <p className='text-gray-600'>{singleJob?.createdAt?.split("T")[0]}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Description */}
                <div className='mt-8 pt-6 border-t border-gray-200'>
                    <h3 className='font-semibold text-gray-900 mb-3'>Description</h3>
                    <p className='text-gray-600 leading-relaxed'>{singleJob?.description}</p>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;