import { Button } from "@/components/ui/button";
import { useCreateQuoteMutation, useGetQuotesByUserIdQuery } from "@/lib/api";

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

const quoteSchema = z.object({
  quote_name: z
        .string()
        .min(5, {message: "Quote must be at least 5 characters."})
        .max(200, {message: "Quote must be at maximum 80 characters."}),
  isPublic: z.boolean().default(false),
});

const AddQuotePage = () => {

    const { register, handleSubmit, reset, formState: { errors, touchedFields, dirtyFields, isDirty, isValid } } = useForm({
        resolver: zodResolver(quoteSchema),
        defaultValues: {
            quote_name: "",
            isPublic: false,
        },
    });

    const [ createQuote, { isLoading, isSuccess, isError, error, data }] = useCreateQuoteMutation();
    const { refetch } = useGetQuotesByUserIdQuery();

    const onSubmit = async (data) => {

        const result = await createQuote(data);
        
        if(result?.data){
            toast.success(result.data.message);
            reset();
            await refetch();
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

    const handleReset = () => {
        reset();
    }

    return (
        <section className="min-h-screen flex flex-col justify-center items-center">
            <div className="w-full max-w-xl bg-[#FFFAFA] rounded-[15px]">
                
                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className="py-[50px] px-[40px] flex flex-col gap-6">
                    
                    
                    <textarea
                        {...register("quote_name")}
                        className="w-full bg-[#FAF5F5] rounded-2xl h-[100px] resize-none font-protest-regular p-[15px] text-center text-[#73A1BE]" 
                        placeholder="Write your quote....">
                        
                    </textarea>

                    {errors.quote_name && (
                        <p className="text-red-500 text-sm font-protest-regular text-center">{errors.quote_name.message}</p>
                    )}

                    <label className="font-protest-regular text-[#373737]">
                        <input
                            {...register("isPublic")}
                            className="mr-3" 
                            type="checkbox" />
                        Is Public
                    </label>

                    <div className="flex flex-row justify-end gap-2 font-protest-regular">
                        <Button
                            type="button"
                            onClick={handleReset}
                            className="bg-[#c65b5b] hover:bg-[#d1b2b2] rounded-[5px] cursor-pointer">Reset</Button>
                        <Button type="submit" className="bg-[#5894d0] hover:bg-[#a2b2c0] rounded-[5px] cursor-pointer">Save</Button>
                    </div>
                </form>

            </div>
        </section>
    );
}

export default AddQuotePage;