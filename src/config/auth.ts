const private_key = process.env["PRIVATE_KEY_AUTH"];

if(!private_key){
    throw new Error("PRIVATE_KEY_AUTH not found");
}

export const config = {
    private_key
}