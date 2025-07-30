import MyQuoteBoxEdit from "@/components/MyQuoteBoxEdit";
import MyQuoteBoxView from "@/components/MyQuoteBoxView";
import { useDeleteQuoteByIdMutation, useGetQuotesByUserIdQuery } from "@/lib/api";
import { useState } from "react";
import toast from "react-hot-toast";

const MyQuotesPage = () => {

    const { data: quotes, isLoading, isFetching, isSuccess,  isError, error, refetch } = useGetQuotesByUserIdQuery();
    const [ deleteQuoteById, { data, error: deleteError, isLoading: IsDeleting, isSuccess: IsDeleteSuccess, isError: isDeleteError }] = useDeleteQuoteByIdMutation();
    const [ editQuoteId ,setEditQuoteId] = useState(null);
    const [ editQuoteName ,setEditQuoteName] = useState("");
    const [ editQuoteIsPublic ,setEditQuoteIsPublic] = useState(null);

    // console.log('quotes',quotes);
    // console.log('isLoading',isLoading);
    // console.log('isFetching',isFetching);
    // console.log('isSuccess',isSuccess);
    // console.log('isError',isError);
    // console.log('error',error);

    if (isLoading || isFetching) {
        return (
            <div className="min-h-screen font-protest-regular flex justify-center items-center ">
                <p className="text-gray-500 text-sm">Loading your quotes...</p>
            </div>
        );
    }

    if (isError) {

        let errorMessage = "Something went wrong while fetching your quotes.";

        if (error?.data?.message) {
            errorMessage = error.data.message;
        } else if (error?.status === "FETCH_ERROR") {
            errorMessage = "Failed to connect to the server.";
        }

        return (
            <div className="min-h-screen flex flex-col justify-center items-center font-protest-regular">
                
                <p className="text-red-500 text-sm">{ errorMessage }</p>

                <button 
                    onClick={() => refetch()} 
                    className="mt-4 px-4 py-2 bg-[#5894d0] text-white hover:bg-[#a2b2c0] rounded-[5px] cursor-pointer"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (isSuccess && (!quotes || quotes.length === 0)) {
        return (
            <div className="min-h-screen flex justify-center items-center font-protest-regular">
                <p className="text-gray-500 text-sm">No quotes found.</p>
            </div>
        );
    }

    const handleEdit = async (id, quote_name, isPublic) => {
        setEditQuoteId(id)
        setEditQuoteName(quote_name)
        setEditQuoteIsPublic(isPublic)
    }

    const handleExitMode = async () => {
        setEditQuoteId(null);
        setEditQuoteName("");
    }

    const handleDelete = async (id) => {

        const result = await deleteQuoteById(id);

        console.log(result);

        if(result?.data){
            toast.success(result.data.message);
            await refetch(); // re-fetch quotes
        }else if(result?.error){
            if(result.error.data?.message){
                // Backend validation error (e.g., 400, 500 with JSON response)
                toast.error(result.error.data.message);
            }else if(result.error.status === "FETCH_ERROR"){
                // Network or server is unreachable
                toast.error('Failed to connect to the server.');
            }else{
                // Fallback for any other unexpected structure
                toast.error('Something went wrong');
            }
        }

    }

    return (
        <section className="px-4 py-10 flex flex-wrap justify-center items-start gap-x-6 gap-y-10">
            {
                quotes?.map((quote) => (
                        editQuoteId === quote._id ? ( 
                            <MyQuoteBoxEdit key={quote._id} editQuoteId={editQuoteId} editQuoteName={editQuoteName} editQuoteIsPublic={editQuoteIsPublic} exitEditMode={handleExitMode} refetch={refetch} />
                        ): (                           
                            <MyQuoteBoxView key={quote._id} quote={quote} onEdit={handleEdit} onDelete={handleDelete} />
                        )
                ))
            }
        </section>
    );
}

export default MyQuotesPage;


// <section className="px-4 py-10 flex flex-wrap justify-center items-start gap-x-6 gap-y-10">
//             {
//                 quotes?.map((quote) => (
//                     <div key={quote._id}>
//                         {editQuoteId === quote._id ? ( 
//                             <MyQuoteBoxEdit editQuoteId={editQuoteId} editQuoteName={editQuoteName} editQuoteIsPublic={editQuoteIsPublic} exitEditMode={handleExitMode} refetch={refetch} />
//                         ): (                           
//                             <MyQuoteBoxView key={quote._id} quote={quote} onEdit={handleEdit} onDelete={handleDelete} />
//                         )}
//                     </div>
//                 ))
//             }
//         </section>