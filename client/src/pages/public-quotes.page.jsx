import PublicQuoteBox from "@/components/PublicQuoteBox";
import { useGetPublicQuotesQuery, useGetQuotesByUserIdQuery } from "@/lib/api";

const PublicQuotesPage = () => {

    const { data: quotes, isLoading, isFetching, isSuccess,  isError, error, refetch } = useGetPublicQuotesQuery();

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


    return (
        <section className="px-4 py-10 flex flex-wrap justify-center items-start gap-x-6 gap-y-10">
            {
                quotes?.map((quote) => (                    
                    <PublicQuoteBox key={quote._id} quote={quote} />
                ))
            }
        </section>
    );
}

export default PublicQuotesPage;