import React from 'react';
import { Button } from './ui/button';
import { Bookmark, MapPin, Calendar, Briefcase, Clock, DollarSign } from 'lucide-react';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();
    
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    const daysAgo = daysAgoFunction(job?.createdAt);
    const timeText = daysAgo === 0 ? "Today" : `${daysAgo} days ago`;

    return (
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1'>
            {/* Header with date and bookmark */}
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-2'>
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className='text-sm text-gray-500 font-medium'>{timeText}</p>
                </div>
                <Button 
                    variant="outline" 
                    className="rounded-full w-9 h-9 p-0 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors duration-200" 
                    size="icon"
                >
                    <Bookmark className="w-4 h-4 text-gray-500 hover:text-purple-600" />
                </Button>
            </div>

            {/* Company info */}
            <div className='flex items-center gap-3 mb-4'>
                <div className='w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center'>
                    <Avatar className="w-10 h-10">
                        <AvatarImage 
                            src={job?.company?.logo} 
                            alt={job?.company?.name}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </Avatar>
                </div>
                <div className='flex-1'>
                    <h3 className='font-semibold text-gray-900 text-lg'>{job?.company?.name}</h3>
                    <div className='flex items-center gap-1'>
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <p className='text-sm text-gray-500'>Bangladesh</p>
                    </div>
                </div>
            </div>

            {/* Job title and description */}
            <div className='mb-5'>
                <h1 className='font-bold text-xl text-gray-900 mb-3 leading-tight'>{job?.title}</h1>
                <p className='text-gray-600 leading-relaxed line-clamp-2'>{job?.description}</p>
            </div>

            {/* Job badges */}
            <div className='flex flex-wrap items-center gap-2 mb-6'>
                <Badge className='bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 font-medium px-3 py-1.5'>
                    <Briefcase className="w-3.5 h-3.5 mr-1.5" />
                    {job?.position} Positions
                </Badge>
                <Badge className='bg-red-50 text-red-700 hover:bg-red-100 border-red-200 font-medium px-3 py-1.5'>
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                    {job?.jobType}
                </Badge>
                <Badge className='bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200 font-medium px-3 py-1.5'>
                    <DollarSign className="w-3.5 h-3.5 mr-1.5" />
                    {job?.salary}
                </Badge>
            </div>

            {/* Action buttons */}
            <div className='flex items-center gap-3'>
                <Button 
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 font-medium py-2.5 rounded-xl transition-all duration-200"
                >
                    View Details
                </Button>
                <Button 
                    className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                >
                    Save For Later
                </Button>
            </div>
        </div>
    );
};

export default Job;