import { useState, useEffect } from "react"

export default function Match(){


    const [image, setImage] = useState("")   //BMPBase64
    const [template, setTemplate] = useState("")
    



    async function scanFinger(){

        const response = await fetch("http://localhost:3000/scanFinger")

        const result = await response.json()

        setImage(result.BMPBase64)
        setTemplate(result.TemplateBase64)
        
    }

    async function findUser(){

        const response = await fetch("http://localhost:3000/match", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({template})
        })
       
        const data = await response.json()
        console.log(data)

    }



    const displayImage = ( image == "" ? null : <img className="h-40" src={`data:image/bmp;base64,${image}`}/>);



    return(
        <div className="h-[100dvh] w-screen flex flex-col items-center justify-center gap-5">
            {displayImage}
             <button className="border-2 rounded-md p-2" onClick={scanFinger}>Scan Finger</button>
             <button onClick={findUser} className="border-2 rounded-md p-2" >Find User</button>
        </div>
    )


}