import fetch from "node-fetch"
import mongoose from "mongoose"
import User from "../models/UserSchema.js"
import https from "https"


export const ScanFingerController = (req, res) => {

    const url = "https://localhost:8000/SGIFPCapture"

    const parameters = {
        Timeout : 15000, //15sec
        TemplateFormat : "ISO"
    }

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false, // ignore invalid certs
    });

    fetch(url, {
        method : "POST",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        body : new URLSearchParams(parameters),
        agent : httpsAgent
    })
    .then(response => response.json())
    .then(data => {

        return res.json({success : true,message : "finger scanned",  BMPBase64 : data.BMPBase64, TemplateBase64 : data.TemplateBase64})
        
    })
    .catch(err => {
        return res.json({success : false, message : err})
    })

}

export const FindUserByFinger = async(req, res) => {

    const {template} = req.body;


    const url = "https://localhost:8000/SGIMatchScore"
    
    const users = await User.find();


    for(const user of users){

        const response = await fetch(url, {
            method : 'POST',
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            body : new URLSearchParams({Template1 : template, Template2 : user.template, TemplateFormat : "SG400"}),
            agent: new https.Agent({ rejectUnauthorized: false })
        })

        const data = await response.json()

        if(data.MatchingScore > 140){
            return res.json({success : true,  user})
        }

        
    }

    return res.json({success : false, message : "Fingerprint didnt match any user, you should probably sign up"})

}

