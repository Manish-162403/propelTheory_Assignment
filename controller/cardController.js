const cardModel = require("../model/cardModel")
const aws = require("aws-sdk");
const objectId = require('mongoose').Types.ObjectId


const isValid = function (value) {
    if (typeof value == 'undefined' || value === null) return false
    if (typeof value == 'string' && value.trim().length === 0) return false
    return true
}

/*******************************************************************************************/
// file upload with AWS S3.
aws.config.update(
    {
        accessKeyId: "AKIAY3L35MCRVFM24Q7U",
        secretAccessKey: "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",
        region: "ap-south-1"
    }
)

let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {

        let s3 = new aws.S3({ apiVersion: "2006-03-01" })

        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",
            Key: "propelTheory/" + file.originalname,
            Body: file.buffer
        }
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }
            return resolve(data.Location)
        })
    })
}

/*******************************************************************************************/
// card creation

const createCard = async function(req,res){

    const cardInput = req.body;
   let files = req.files
    const{
        Name, 
        Designation, 
        companyName, 
        contactNumber, 
        emailId, 
        websiteURL,
        socialURLs
    } = cardInput

if(!isValid(Name)){
    return res.status(400).send({ status: false, msg: "please provide Name" })
}

if(!Designation){
    return res.status(400).send({ status: false, msg: "please provide Designation" })
}

if(!companyName){
    return res.status(400).send({ status: false, msg: "please provide companyName" })
}

if(!contactNumber){
    return res.status(400).send({ status: false, msg: "please provide contactNumber" })
}

if (!/^([+]\d{2})?\d{10}$/.test(contactNumber)) {
    return res.status(400).send({ status: false, msg: "please provide a valid moblie Number" });
}

if(!emailId){
    return res.status(400).send({ status: false, msg: "please provide emailId" })
}

if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(emailId))){
    return res.status(400).send({ status: false, msg:` ${emailId} is not a valid email` })
}

if(socialURLs && socialURLs.length >3){
    return res.status(400).send({ status: false, msg:"Maximum 3 social URL's allowed" })
}


if (files && files.length > 0) {
   var profileLogo = await uploadFile(files[0])
}else{ 
    return res.status(400).send({ status: false, msg: "please provide companyLogo" })
}


const finalCardData = { 
    Name, 
    Designation, 
    companyName, 
    contactNumber, 
    emailId, 
    websiteURL, 
    socialURLs,
    companyLogo: profileLogo
}

    

    const createCard = await cardModel.create(finalCardData)

    return res.status(201).json({message:"card successfully created", card: createCard})

}


const getCardById = async function(req,res){

   try{ 
     const cardId = req.params.cardId

     if(!objectId.isValid(cardId)){
        return res.status(400).send({status: false, message: "card does not exist with this Id."})
    }

    const getCardDetails = await cardModel.findById(cardId)
    if(!getCardDetails){
        return res.status(404).json({message: "card not found"})
    }

    return res.status(200).json({message: "card details are:", cardDetails:getCardDetails})

} catch (error) {
    return res.status(500).json({ status: false, msg: error.message })
}}

module.exports= {createCard, getCardById}