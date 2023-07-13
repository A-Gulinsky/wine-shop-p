import nodemailer from 'nodemailer';
import 'dotenv/config'

const pass = process.env.mailPass

export const subscribeService = async (req, res) => {
  
  try {

    const mail = req.body.inputValue

    // transporter
    const transporter = transporterSettings()
    
    // mailText
    const text = mailText()
    
    // mail Options for send
    const mailOptions = mailOptionsFunc(mail,text)
    
    // sendMail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
      
        res.json(`Invalid mail`)
      } else {
      
        res.json(`Letter sent to mail`)
     }
    })

  } catch (err) {
    console.log(err)
    res.status(500).send(`Internal server error`)
  }

}

// transporter
function transporterSettings() {
  return nodemailer.createTransport({

      host: `smtp.gmail.com`,
      port: 465,
      secure: true,
      auth: {
        user: 'wineshopzhytomyr@gmail.com',
        pass: pass
      }
    })
}

// mail text
function mailText() {
  return 'Welcome to Wine Shop!\n\n' +
    'Thank you for subscribing to our newsletter. Now you will be the first to receive the latest news, special offers, and exclusive discounts.\n\n' +
    'We will share interesting articles about wine, new arrivals, and tips from our experts.\n\n' +
    'If you have any questions or suggestions, feel free to contact us. We are always ready to assist you.\n\n' +
    'Best regards,\n' +
    'The Wine Shop Team';
}

// mail Options
function mailOptionsFunc(mail,text) {
  return {
      from: `wineshopzhytomyr@gmail.com`,
      to: mail,
      subject: `Wine Shop: Subscribe to news!`,
      text: text
    }
}

