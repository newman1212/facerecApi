const Clarifai = require('clarifai');
// console.log(Clarifai)

const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key 7bc118c5a5c245c0a6ecbb7269b957b5");

// const app = new Clarifai.App({
//  apiKey: '6e883bcb9dc9476da42964122e04ba19' 
//  // '7bc118c5a5c245c0a6ecbb7269b957b5'
// });

// // 8bbf99ece230491ebb2ee4d52e3e5937








apiCallHandler = (req,res) => {

stub.PostModelOutputs(
    {
        // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
        model_id:
        'face-detection',

        inputs: [{data: {image: {url: req.body.input}}}]
    },
    metadata,
    (err, response) => {
        if (err) {
            console.log("Error: " + err);
            return;
        }

        if (response.status.code !== 10000) {
            console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
            return;
        }

        console.log("Predicted concepts, with confidence values:",
            response.outputs[0].data.regions[0].region_info.bounding_box)
        // for (const c of ) {
        //     console.log(c.name + ": " + c.value);
        //     console.log(response);
        // }
        res.json(response)
    }
);



 // .then(data=>res.json(data))
 //  .catch(err => res.status(400).json('unable to work with API'));
}


const imageFormHandler =(req,res,db)=>{
	const {id} = req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=> {res.json(entries[0].entries)})
		.catch(err=> {res.status(400).json("unable to get entries")
            console.log(err);
        })
}

module.exports = {
	imageFormHandler:imageFormHandler,
	apiCallHandler:apiCallHandler

}