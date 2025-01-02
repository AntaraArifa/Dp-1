import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { CHAT_API_END_POINT } from "@/utils/constant";

const CreateGroupChatDialog = ({ open, setOpen, onChatCreated }) => {
    const [input, setInput] = useState({
        chatName: "",
        users: "",
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!input.chatName || !input.users) {
            toast.error("Chat name and users are required!");
            return;
        }
    
        try {
            setLoading(true);
    
            
            const emailArray = input.users.split(",").map((email) => email.trim());
    
            
            const { data: resolvedUsers } = await axios.post(
                `${CHAT_API_END_POINT}/resolve-emails`,
                { emails: emailArray },
                {
                    withCredentials: true, 
                }
            );
    
            if (resolvedUsers.length < 2) {
                toast.error("At least 2 users are required to create a group chat.");
                setLoading(false);
                return;
            }
    
            
            const userIds = resolvedUsers.map((user) => user._id);
    
           
            const { data } = await axios.post(
                `${CHAT_API_END_POINT}/group`,
                {
                    name: input.chatName,
                    users:userIds,
                },
                {
                    withCredentials: true, 
                }
            );
    
            toast.success("Group chat created successfully!");
            onChatCreated(data); 
        } catch (error) {
            console.error("Error creating group chat:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to create chat.");
        } finally {
            setLoading(false);
            setOpen(false); 
        }
    };
    

    return (
        <Dialog open={open}>
            <DialogContent
                className="sm:max-w-[425px]"
                onInteractOutside={() => setOpen(false)}
            >
                <DialogHeader>
                    <DialogTitle>Create Group Chat</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="chatName" className="text-right">
                                Chat Name
                            </Label>
                            <Input
                                id="chatName"
                                name="chatName"
                                type="text"
                                value={input.chatName}
                                onChange={handleInputChange}
                                placeholder="Enter chat name"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="users" className="text-right">
                                Users
                            </Label>
                            <Input
                                id="users"
                                name="users"
                                type="text"
                                value={input.users}
                                onChange={handleInputChange}
                                placeholder="Enter user emails, separated by commas"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        {loading ? (
                            <Button className="w-full my-4" disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4">
                                Create Group Chat
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateGroupChatDialog;
