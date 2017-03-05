import express from 'express'
import {sendMail} from './services/SendGrid'
import bodyParser from 'body-parser'

const app = express()
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json())


app.get('/',(req,res)=>{
	res.send({msg:'It works 🔥'})
})

app.post('/send-email',(req,res)=>{
	console.log(req.body);
	const {toEmail,subject,content} = req.body
	sendMail({toEmail,subject,content})
		.then((response)=>{
			res.send(response)
		})
		.catch((err)=>res.send(err))
	// res.send(req.body);
})
app.listen(3000)

export default app