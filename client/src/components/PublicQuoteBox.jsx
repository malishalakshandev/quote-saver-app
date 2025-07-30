const PublicQuoteBox = ({ quote }) => {

    return (
        <div className="w-full max-h-40 max-w-[350px] bg-[#FFFAFA] rounded-[8px] p-[10px] shadow-md">
            
            {/* quote area */}
            <div>
                <textarea
                    readOnly
                    defaultValue={quote.quote_name}
                    className="w-full rounded-2xl h-[100px] resize-none text-[13px] font-protest-regular p-[15px] text-center text-[#73A1BE] focus:outline-none focus:ring-0 focus:border-none" />
            </div>

            {/* author name */}
            <div>
                <p className="font-protest-regular text-[12px] text-center">By {quote.user.first_name} {quote.user.last_name}</p>
            </div>
            
        </div>
    );

}

export default PublicQuoteBox;