'use strict';
const nodemailer = require('nodemailer');

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: '33712112@qq.com', // generated ethereal user
            pass: 'sbexaeussvsqcabj' // generated ethereal password
        }
    });

    let mailObj = {
        from: '"zesenchen" <33712112@qq.com>', // sender address
        to: '33712112@qq.com', // list of receivers
        subject: 'nodemailer-test', // Subject line
        text: 'Hello world! 验证码为：123456', // plain text body
        // html: '<b>Hello world?</b>' // html body
    }

    // send mail with defined transport object
    // transporter.sendMail(mailObj);
    transporter.sendMail(mailObj,(err,data)=>{
        console.log(err)
        console.log(data)
    });
