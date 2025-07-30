import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";
import { useUpdateQuoteByIdMutation } from "@/lib/api";
import toast from "react-hot-toast";

const quoteSchema = z.object({
  quote_name: z
        .string()
        .min(5, {message: "Quote must be at least 5 characters."})
        .max(200, {message: "Quote must be at maximum 80 characters."}),
  isPublic: z.boolean().default(false),
});

const MyQuoteBoxEdit = ({editQuoteId, editQuoteName, editQuoteIsPublic, exitEditMode, refetch}) => {

    const { register, handleSubmit, reset, formState: { errors, touchedFields, dirtyFields, isDirty, isValid } } = useForm({
        resolver: zodResolver(quoteSchema),
        defaultValues: {
            quote_name: editQuoteName,
            isPublic: editQuoteIsPublic,
        },
    });

    const [ updateQuoteById ] = useUpdateQuoteByIdMutation();

    const onSubmit = async (data) => {
        const result = await updateQuoteById({id: editQuoteId , ...data});
        
        if(result?.data){
            toast.success(result.data.message);
            reset();
            await refetch(); // re-fetch quotets
            exitEditMode();
        }else if(result?.error){

            if(result.error.data?.message){
                // Backend validation error (e.g., 400, 500 with JSON response)
                toast.error(result.error.data.message);
            }else if(result.error.status === "FETCH_ERROR"){
                // Network or server is unreachable
                toast.error('Failed to connect to the server.');
            }else{
                // Fallback for any other unexpected structure
                toast.error('Something went wrong.');
            }
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-h-40 max-w-[350px] bg-[#bdae8312] rounded-[8px] p-[10px] shadow-md">

            <div className="flex">
                
                {/* isPublic checkbox */}
                <div className="flex-[3]">
                    <label className="font-protest-regular text-xs text-[#373737]">
                        <input
                            {...register("isPublic")}
                            className="mr-3" 
                            type="checkbox" />
                        Is Public
                    </label>
                </div>

                {/* edit / cancel icons */}
                <div
                    className="flex flex-row gap-1 justify-end flex-[1]">

                    <button 
                        type="submit">
                        <svg
                            className="cursor-pointer text-[#656565] hover:text-[#2A2A2A] transition-colors duration-300" 
                            width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M9.375 5.625H3.125V3.125H9.375M7.5 11.875C7.00272 11.875 6.52581 11.6775 6.17417 11.3258C5.82254 10.9742 5.625 10.4973 5.625 10C5.625 9.50272 5.82254 9.02581 6.17417 8.67417C6.52581 8.32254 7.00272 8.125 7.5 8.125C7.99728 8.125 8.47419 8.32254 8.82583 8.67417C9.17746 9.02581 9.375 9.50272 9.375 10C9.375 10.4973 9.17746 10.9742 8.82583 11.3258C8.47419 11.6775 7.99728 11.875 7.5 11.875ZM10.625 1.875H3.125C2.79348 1.875 2.47554 2.0067 2.24112 2.24112C2.0067 2.47554 1.875 2.79348 1.875 3.125V11.875C1.875 12.2065 2.0067 12.5245 2.24112 12.7589C2.47554 12.9933 2.79348 13.125 3.125 13.125H11.875C12.2065 13.125 12.5245 12.9933 12.7589 12.7589C12.9933 12.5245 13.125 12.2065 13.125 11.875V4.375L10.625 1.875Z" />
                        </svg>
                    </button>

                    <svg
                        onClick={exitEditMode}
                        className="cursor-pointer text-[#D04F4F] hover:text-[#a34747] transition-colors duration-300"
                        width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M12.3191 3.56718L11.4317 2.67969L7.50039 6.61719L3.56913 2.67969L2.68164 3.56718L6.61914 7.49844L2.68164 11.4297L3.56913 12.3172L7.50039 8.37969L11.4317 12.3172L12.3191 11.4297L8.38164 7.49844L12.3191 3.56718Z" />
                    </svg>

                </div>

            </div>
            

            {/* quote area */}
            <div>
                <textarea
                    {...register("quote_name")}
                    className="border border-[#63645012] bg-[#0a0a0a08] w-full rounded-2xl h-[100px] resize-none text-[13px] font-protest-regular p-[15px] text-center text-[#73A1BE]" />
            </div>
                
        </form>
    );

}

export default MyQuoteBoxEdit;