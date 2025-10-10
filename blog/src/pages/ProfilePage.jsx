import SearchBar from "../components/SearchBar";
import { use, useEffect, useState } from "react";
import PersonalSearchBar from "../components/PersonalSearchBar";

const ProfilePage = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    //Search Posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await api.getPosts();
                setPosts(posts);
                setFilteredPosts(posts);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPosts();
    }, []);

    //Live Search
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (!searchQuery.trim()) {
                setFilteredPosts(posts);
                return;
            }

            const results = posts.filter(
                (p) =>
                    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.content.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPosts(results);
        }, 300); // debounce search typing
        return () => clearTimeout(delayDebounce);
    }, [searchQuery, posts]);


    return (

        <div className="flex flex-col min-h-screen px-5 pt-5 text-xl gap-2">
            <div className="px-1 font-semibold">
                <h1>User Profile</h1>
            </div>
            <div className="flex flex-rows justify-between gap-2">
                <div className="flex-1 border justify-start border-gray-300 rounded-md shadow-md">
                    <h1 className="px-5 py-2 mb-3 font-semibold">Personal Information</h1>

                    <div className="w-full pb-5 flex flex-col">
                        <div className="flex flex-row px-5 gap-3">
                            <div className="flex flex-1 flex-col">
                                <span className="text-base font-semibold">First Name</span>
                                <span className="border border-gray-300 p-2 px-3 rounded-md text-base">Rhea Mae</span>
                            </div>

                            <div className="flex flex-1 flex-col">
                                <span className="text-base font-semibold">Last Name</span>
                                <span className="border border-gray-300 p-2 px-3 rounded-md text-base">Arnado</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-base font-semibold">MI</span>
                                <span className="border border-gray-300 p-2 px-3 rounded-md text-base">NA</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-base font-semibold">Suffix <span className="text-gray-500 text-sm font-normal">(e.g., Jr, Sr.)</span></span>
                                <span className="border border-gray-300 p-2 px-3 rounded-md text-base">NA</span>
                            </div>
                        </div>

                        <div className="p-5 flex flex-col">
                            <span className="text-base font-semibold ">Address</span>
                            <span className="border border-gray-300 p-2 px-3 rounded-md text-base">NA</span>
                        </div>

                        <div className="flex flex-row px-5 gap-3">
                            <div className="flex flex-1 flex-col">
                                <span className="text-base font-semibold">Email Address</span>
                                <span className="border border-gray-300 p-2 px-3 rounded-md text-base">rrheamaearnado@gmail.com</span>
                            </div>

                            <div className="flex flex-1 flex-col">
                                <span className="text-base font-semibold">Phone Number</span>
                                <span className="border border-gray-300 p-2 px-3 rounded-md text-base">09123121234</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="flex flex-col flex-1 border justify-start border-gray-300 rounded-md shadow-md">
                    <h1 className="px-5 py-2 mb-3 font-semibold">Account Details</h1>

                    <div className="flex flex-col gap-1 flex-grow">
                        <div className="flex flex-row px-5">
                            <div className="flex flex-col min-w-80">
                                <span className="text-base font-semibold text-base">Email</span>
                                <span className="border border-gray-300 p-2 px-3 rounded-md text-base">rrheamaearnado@gmail.com</span>
                            </div>
                        </div>

                        <div className="flex flex-row px-5 p-2 gap-4">
                            <div className="flex flex-col min-w-60">
                                <span className="text-base font-semibold">Username</span>
                                <span className="border border-gray-300 p-2 px-3 rounded-md text-base">rrhea</span>
                            </div>

                            <div className="flex flex-col w-60">
                                <span className="text-base font-semibold">Password</span>
                                <span className="border border-gray-300 p-2 px-3 rounded-md text-base">**********</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end p-5 text-base gap-2">
                        <button className="bg-blue-600 text-white rounded-md py-1 px-3 hover:bg-blue-800">Edit</button>
                        <button className="bg-red-600 text-white rounded-md p-2 px-3 hover:bg-red-800">Delete</button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col border border-gray-300 min-h-130 rounded-lg shadow-md overflow-y-auto mt-2">
                <h1 className="px-5 font-semibold py-2">Personal Announcements</h1>
                <div className="flex-1 px-5 text-base">
                
                    <PersonalSearchBar />

                </div>
            </div>
        </div>

    );

};


export default ProfilePage;