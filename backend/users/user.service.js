const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const nodeMailer = require('nodemailer');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ email, password }) {
    const user = await db.User.scope('withHash').findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password)))
        throw 'Email or password is incorrect';
    if (user.emailVerified == 0)
        throw 'Please check your email to verify your account.';
    // authentication successful
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}

async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.password = await bcrypt.hash(params.password, 10);
    }

    // Sending the email to verify the account
    let verificationCode = generateVerificationCode();

    params['verifyCode'] = verificationCode;
    params['emailVerified'] = 0;
    params['role'] = 0;

    let transporter = nodeMailer.createTransport({
        host: config.mail.host, // mail.infomaniak.com
        port: config.mail.port,
        secure: config.mail.secure,
        auth: {
            user: config.mail.user,
            pass: config.mail.password
        }
      });
      let mailOptions = {
          from: config.mail.from, // sender address
          to: params.email, // list of receivers
          subject: 'Welcome to Unicash', // Subject line
          text: 'Verify your account',
          html: '<html>'
					+ '<head>'
					+ '<title></title>'
					+ '<link href="https://svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/css/wsc.css" rel="stylesheet" type="text/css" />'
					+ '<link href="https://svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/css/wsc.css" rel="stylesheet" type="text/css" />'
					+ '<link href="https://svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/css/wsc.css" rel="stylesheet" type="text/css" />'
					+ '<link href="https://svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/css/wsc.css" rel="stylesheet" type="text/css" />'
					+ '<link href="https://svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/css/wsc.css" rel="stylesheet" type="text/css" />'
					+ '<link href="https://svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/css/wsc.css" rel="stylesheet" type="text/css" />'
					+ '<link href="https://svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/css/wsc.css" rel="stylesheet" type="text/css" />'
					+ '</head>'
					+ '<body aria-readonly="false"><span style="font-family:tahoma,geneva,sans-serif">Hello, ' + params.fullName + ',<br />'
					+ '<br />'
					+ '<h3>Welcome to Unicash</h3><br />'
					+ '<br />'
					+ 'Please input the following URL to confirm your account.<br />'
					+ 'http://localhost:4000/verify?email=' + params.email + '&verifyCode=' + verificationCode +'<br />'
					+ 'Unicash support</span><br />'
					+ '&nbsp;'
					+ '<hr />'
					+ '</body>'
					+ '</html>' // html body
      };
      
      await transporter.sendMail(mailOptions);

      await db.User.create(params);
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const emailChanged = params.email && user.email !== params.email;
    if (emailChanged && await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.password = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { password, ...userWithoutHash } = user;
    return userWithoutHash;
}

function generateVerificationCode() {
    var length = 8;
    var charset = "0123456789ABCDEF";
    var retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }