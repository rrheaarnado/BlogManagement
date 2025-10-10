import PersonalSearchBar from "../components/PersonalSearchBar";

const NotificationPage = () => {
    return (
        <div className="flex flex-col flex-1 overflow-hidden px-5 gap-3">

            <div className="flex-1 pt-3 bg-white">
                <div className="p-1 py-2 text-xl font-semibold">
                    <h1>Notifications</h1>
                </div>
                <div>
                    <PersonalSearchBar />
                </div>
            </div>

            <div className="flex-1  border border-gray-200 rounded-md ">
                <div className="h-50 shadow-md">
                    <span>Hell</span>
                </div>
            </div>


        </div>
    )
}

export default NotificationPage;