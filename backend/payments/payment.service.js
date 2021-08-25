const db = require('_helpers/db');
const config = require('config.json');
const { param } = require('./payments.controller');
const userService = require('../users/user.service');
const sgMail = require('@sendgrid/mail');

module.exports = {
    createPaymentmethod,
    updatePaymentmethod,
    getPaymentMethods,
    deletePaymentMethod,
    getConversionBetweenUSDPHP,
    
    createTransaction,
    getTransactionById,
    getAllTransactionsByUserId,
    getTransactions
};

async function createPaymentmethod(params) {
    // validate
    if (await db.Paymentmethod.findOne({ where: { userId: params.userId, selectedCurrency: params.selectedCurrency } })) {
        throw '"' + params.name + '" is already added by you';
    }

    await db.Paymentmethod.create(params);
}

async function updatePaymentmethod(id, params) {
    const paymentMethod = await getPaymentMethod(id);
    Object.assign(paymentMethod, params);
    await paymentMethod.save();

    return paymentMethod.get();
}

async function getPaymentMethods(userId) {
    return await getPaymentMethodsByUserId(userId);
}

async function getPaymentMethod(id) {
    const paymentMethod = await db.Paymentmethod.findByPk(id);
    if (!paymentMethod) throw 'Payment method not found';
    return paymentMethod;
}

async function getPaymentMethodsByUserId(userId) {
    const paymentmethods = await db.Paymentmethod.findAll({ where: { userId: userId }});
    if (!paymentmethods) throw 'NO PAYMENT METHOD YET';
    return paymentmethods;
}

async function deletePaymentMethod(id) {
    const paymentMethod = await getPaymentMethod(id);
    await paymentMethod.destroy();
}

async function getConversionBetweenUSDPHP() {
    const conversionRate = await db.Conversion.findOne({ where: { fromCurrency: "USD", toCurrency: "PHP" }});
    if (!conversionRate) return 50.01;
    return conversionRate.rate;
}

///////////////////////////////////// Transaction ////////////////////////////////////
async function createTransaction(params) {
    const orderId = randomOrderId();
    params['orderId'] = orderId;
    const newTransaction = await db.Transaction.create(params);
    sgMail.setApiKey(config.mail.sendgrid_api);
    const user = await userService.getById(params.userId)

    const fullName = user.fullName;
    let htmlContent = `<html>
                        <head>
                        <title>Unicash Team</title>
                        <style>
                            * {
                                font-family: Arial, Helvetica, sans-serif;
                            }
                        </style>
                        </head>
                        <body aria-readonly="false">
                        <h3>Dear ${fullName},</h3>
                        
                        
                        <h4>Thank you for signing up to use Unicash. A secure and trusted exchange service that will serve your transaction needs.</h4>
                        
                        <h4>Here is your exchange transaction information, and it is currently processing.</h4>
                        
                            <div style="display: flex;"><h4 style="width: 140px;">You send:</h4> <h3 style="font-weight: 800;">${params.sendAmount}${params.from}</h3></div>
                            <div style="display: flex;margin-top: -35px"><h4 style="width: 140px;">You received:</h4> <h3 style="font-weight: 800;">${params.amount} PHP ${params.to}</h3></div>
                            <div style="display: flex;margin-top: -35px"><h4 style="width: 140px;">Order Id:</h4> <h3 style="font-weight: 800;">${orderId}</h3></div>
                            <div style="display: flex;margin-top: -35px"><h4 style="width: 140px;">Status:</h4> <h3 style="font-weight: 800;">${params.status}</h3></div>
                        
                        <h4>We will send you email transaction information once completed.</h4>
                        
                        <h4>Having trouble in your transaction? Please send us email support at <a href="email:${config.mail.from}">${config.mail.from}</a></h4>
                        
                        <h3>Unicash Team</h3>
                        </html>`
    if (params.status === 'Completed') 
        htmlContent = `<html>
                        <head>
                        <title>Unicash Team</title>
                        </head>
                        <body aria-readonly="false">
                        <div>
                            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEA3ADcAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCABSAPgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKACiiigAoopH6UALTJiQAQQOec07otefftLftI+FP2V/hfd+LfGGpR6dplqwijypeS5mbO2KNRyzHBOB0AJOACRM5qEXKWyN8NhauJqxw9CLlOTSSW7b6I6Tx7460n4beF73Wdbv7bTNK06Jri5uJ5BHHEigkliewArL+BXxj0f49fDfS/FegPPLo2tRGezkljMbSx7iFfaem7G4A4IDAEA8D8Nv+ChX/BSnxT+3J4ua2AuNB8CafKTp+ihwWl2nie4I4eX7x2j5UHyjJ3O/64f8EryT+wf8NR6aPGfxySSPWvEwGcwxmKnQo/DFXv3P1fjLwmxnC/D2HzLM3avWn8H8sbX1839x9F5ozmod5LAZHuKWE/OB7V71j8f5iWiiikUFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFNkbbjjNDAdmjNRN/rD1+lUNf8AEdj4e0ye8v721sba2RpJZZZFRY1AJLEscADrk0m7ascIylLkS1NTNFZfhrX7LxbodnqmmXlrqOm6lAl3aXdtKssF1E6hkkjdSQyMpBDDgg5HWr6jP1NNEyfLo9yRjhTXwX/wcK/8mY6F/wBjTb/+k9xX3lg49q+Df+DhKQn9jLQxg4/4Sm3/APSe45/Dr1HSvMzr/caq8mfoXhRpxfl9/wDn7E/GRP8A2b+gr+gT/gleMfsB/DXkjOkR9PqeK/IP9hv/AIJt+Ov22NdSeyhbQPB8T/6Tr91CxhIBI224486TcGBwwVdpBbJAP6L/ALQ//BQD4cf8EvPgjpvwu8HzP4s8W+H9Pjsbex+07za/KD513KvCsQd/lqAzb0AVFYMPkOFqTwkJ4vE+7B7XP6f+kLmFLiWvhuGci/f4mM25KOqirW96Wy3+XU+j/wBq39sTwT+yH4LGqeLNR2zXZZLCwtyr3moyDHyxKeuNygsflGea9X0u6F5Akq52yLuGR6+/ev5v/iT8aPGv7W3x9h17xDdXmveJtZvIre1t4FZ1iBkPl20EQ+6FJwFXknlizEu39HPhlPJ0q1QjaVhUYxj/AD+P9a+nyjNVjnOUFZRdvU/nfxL8NVwhRwlGtVU69RSc0to2tZL/AD6mlRRRXtn5OFFFBoAKKa8ioeSAfenA5oAKKKKACiiigAooooAKKKKACikkYIuSQAPWkRgwyDkHvQA6iiigAooooAKbIu7HtzQz+lIcsvNAr3Pk/wD4K8/tceLf2NP2cdK17wY2nQ6trWuJpTzXUBm+zxvbXEm9FyF3hokwWyuM5ByK/F741/tQfEL9ovUpLnxt4t1vXw0gfyJpglqjAbdyQpiJCeeURe/XNfqj/wAHErf8YieEQfvf8JhDx/25XlfjkSADnp3OcY/H9Pxr834sxNeOMVKDaVkf3n9GzhzKJ8MPNcRRi63PNc8kr2VrK7P6Mv2C33fsSfCU5P8AyKGl9TnH+ix160o2968X/Yt1e28H/sP/AAsbVLiKwSy8HaX55ncRGAi1i3B89Mf0Neb/AB8/4LIfA/4Iwyxx+KF8W6pGoYWegR/bQ4JI/wBcpEKkYOQX3egNfdQxFOjRhKpJLTqz+NsVkePzHNcRTy+jKfvy2i2vifW2x9WzkLGSeAOc46V87f8ABQbxL8D4PhzpUXxo1SwGkaXqSaraac8rPJqFxErIq+RHmSZAZQWXBX+98u6vjHxp/wAFM/2lP2zNS/s/4J/DrVPDui3bNDHqQtRdSPtLEs1zOq20W5cZXBYHgO2VFfNv7Yf/AATx+KnwC+E8XxJ+KWuwajq2sahBp/2aS9l1C9LPFIxM0z8ZUJgBS4PPzcfN5GYZ1ejN0KTkktW1Zf8ABP1Pgrwlh/alClnOPhh6s5JRhCSlVv2926g/PU9B/a4/4LQ+I/iLob+EvhLp7fDnwZDF9mW5hMaajLDtK4UplLdADwYmZxsUqy521wf7H3/BJ74n/tkR2+vuIvDXhPUW85ta1IGSW7G5tzRQA75CT3dowwbIZs4r5ZGeOc+/rzj+lf0E/wDBKmMD9gr4atjk6PH/ADNfN5RF5tipPGO6ilp09D998UatLw04fpQ4ZpRhUrS5ZVGuae173e79bryPJ/Cfwm/Zw/4I4aVo2oeKLyW38QeJPOhg1y/sp9Qu7kx7WkVTDGwhUeYnCqu75c7iuR9O/s8ftH+D/wBqjwB/wlPgbVJNY0IXMlmJ2tJrbEybSwKSqr8bhztxXwH/AMHKf/Iq/CH/AK+tV/8AQLSvYf8Ag3+/5MG/7mW//wDQYa/RaOHp0octNWR/C+bZvjczxEsXj6jqVJbttt/8N5HuX7Sn7f3wl/ZG8R2Ok+P/ABWmjapqlv8AbLe1SwubuV4N7IJCIo32qWVgN2NxVto4Nd54c+M/hjxV8ILTx5BrVlbeEL7T01WPVL1vslulqy7xNI0u3y128kvjHevyN/4OLRn9tzwqACSfA9pgYzk/b9Q/z0/LqF/4KV/FPVdJ/wCCcH7LPg+0u5YNI17w5HqV/EnCXT29varACR8xVDNKxG7GSp2sVBXVK55x9weKf+C4v7O3hzU2tofFeq6vtOGksdFujHnOCNzou7A7gdO9ei/s5f8ABSn4MftT+IY9F8IeNLW41+SPzE0y+t5bG5mADNiJZlUTEKpJ8ouQAScYr4q/4JT/APBJf4UftB/soaV8QPHVjqniHUvEs1z5Nul/JZwadHDcyQKFEDIzuTEzkucAMoVAQWb5B/4KQ/s0Wf7BX7Zs+ieDNT1OHT7eK013Rp2uc3un7uQDKoXJjlico33gpTLltzEtrYD76/4Lg/Cf4ZfEnxZ8PH+Ifxak+Gk1raXy2UaeFLnWheqXh3NmF18vaQoAOS24njFfUn/BPPw7pHgz9jPwFp2geMz8QtEtrJ0stfNrJaG8hNxKUTypGZ4/KDeVsZty+VghT8tfmx/wXG8dXnxS+Hv7OPibUFjW/wDEPhF9UuhGu1PNnispHCjJAAYnuTyOSK9Us/2htV/Zz/4N7/CV/oV3Lp2teIWutBtLuJtklt5+o3hldGGCr+THKFZSGViGHIotrYD61+Ov/BVr4Ffs8eJbzRdd8cW13rlkxSex0m1m1CSFwzKyO8KtGkilSCjuGGOVFYHw7/4LR/s8fErW4dNXxrJoVxdOIon1ixms4CT3afaYox/tOygeucV+cf8AwRy/4J2+HP23vGHijWvG8l+/hjwkLdBYW0nkNqNzOXbDyD51jRYslVCkmRMOApU/VH7Sv/BvL4Q8b67Z3nww8QzeCrYIwvbDURLqUDHC7GhZn8xT97cHZh93btwcp6Afovb3C3luLiGRJo5lDxsr5VgQCCDkjGMdPr3r5y+OP/BWv4D/AAC8WXmhav41W/1rTZGhurXSLOa+MEgJDI0kamIOpBDLv3KQQwUg1e/Y+/ZA8VfAT9kPUfhX4n+IF/rBdLqz0zWNJiaxvNGtJ4gqJC7lyJYpDK6OxO0MgCqqKB8O63+x9+wl+y78RhbeMPilr3iq5tI5I5dHW8e8t1dSU2ySadbK0cisD8jSrz97IyCAfWng7/gtz+zt4x1OK0bxhfaNJPIscbahpN0kTliBnzER1UDPJYqoxkkV9R6H4ksPFegWuqaXfWep6bfwpc215aTpLb3MTLkSRupKupXkEZBGOTX4Eft9+Lv2bfEUmiw/ATwx4m0O5tZZf7Subyeb7FdxHGwRpPLJLvDBucooBA2tkFfpf9mPxF4x1j/ggH8U7bQLjU7m50zWrizRYMtLbaazWUt2qAdVMctwzA8bXkzTsB9nfFX/AILHfs+fCPX7nTLnxyutX1o/lyrotnNfxKcA8TovlN1A+VzggjjFS/CT/gsH8APjLr9tpFj44j0jUbxzHDDrVpPYIzYJAM8i+SpOMANICSQBkkA/jf8AsR+Pvgr4G8eam3xu8E674w0S7tglidLvpIn0+cHLFkjki80MCBu8wAbThHzlfpD4mfst/skftXeJ9Lb4O/F7SfhVd/ZyL3SPElveC2lJbCOk95IqiYElTGskivhSoVlYu+UD7s/4LaLn/gmv4/AJAM2l+mP+Qjbd+g/z618l/wDBAz4/aD8DvhH8adW8aeJrXw/4Y0qbS7lWv7hlgjlkS+MgiQ8tK6xINiAyPsQYPy17V+3j8HdY+An/AARB1LwbrviSPxXqGgQ6dZjVFQqs0H9rQmBFBJO2OFo41OeQgPevhf8A4JL/APBP2w/bv+KOvnxLeajZ+DvCMEFxfxWMypPe3ExkEESswIVSI5i74JG3aNpbcJA/Sa3/AOC4/wCzo+vtZnxZqsUAcqLyTQrsQHnrgRmQZznlOmM4NfT3wr+Kfh34zeDbLxF4V1rT9f0PUI98F5ZzCSNz3U4OVdTwyMAykEMAQRX5kf8ABUb/AII6fD34E/s06n8RPhyuq6RdeGHgbUNOnu3ube9t5JUiZk8xt6SqZFbO4gqrfKW2mqn/AAbb/ErUI/HXxH8IPcSyaXcafb6zHCWJjgnSXyXZQeAzq8YbHaJM/wANO2lwP1mooopAQX0ksVuzQIkkoHyq7lVJ9zg/yrj/ABL4g8dW0ZOleG/DN845Audfnt8/982j4rtyM02QdKiUblwko9Ln52/8FmPiH4l0z9mXRp/Hvw38E39kviKEWkS+Ir+6jhn8i4xI4jhtWK7d4xv6sOO4/OTR/wBt7xV4Iu1uPBmjeCPAs8UJgE2jeH7c3LRn7w8+486c5wD/AKzqBzX7ff8ABQP9mJf2sv2WfE3hKIxx6nPALnTZZBxHdxEPFk4JVWK7GI52u1fz1a7oN74X1270vU7S5sdS02d7W6tp49k1tKjbHjdSPlYEFSp+7g/WvgOK6lehiVWp7NJX9PM/tz6OFLJM4ymrgMVCMqtOTfJJtpqXVQbcdO9rn64fsl/8E4vh/wDtq/A7wf8AELx342+InxGk1XTUlnstU192s7K6ztuY4QioyKsyMuA+MKK+o/hR/wAE6fgt8F5bWbw98PfDlveWUnmwXlxb/bLqJgMBlmmLyA89m/CvyY/4Jqf8FSNU/Ydup9B1u0utf8BX8huHtYmButMlP3pIS2AyNj5kZgCRuXBLK/6o/Dv/AIKj/Af4jaYt1a/Evw3YhuGi1S5GnSg9xtn2E44yRkc172UY/AYmCnGymt77n414n8I8YZJmFXDJ1JYXmbhyX5LN7NR0TXme+W+nxWajyo44wO4QDFfA3/Bwt4ksbb9lLwzpjTImpX3iWGSKEN+8ZEt597Y/ujco+rCvW/jj/wAFhfgZ8GtEuJYfFtt4rv1TdDY6Fi+a4Ofu+ah8lf8Agcgr8gP24P21vEn7b/xcPiHWkGn6dYo0GlaXHKzxWEJbJ5IG6RiMsxGThQMKAKx4izahTwk6MZXclbTp6npeB3hfnmN4hoZviaMqdCjJScpJrmtsop737rTzPGQQVUn7vXrgEcf4Gv6E/wDgmRodz4f/AGEfhhHcFRLPoFtcjB4xKnmL/wCOstfhZ+y/+zprf7VXxu0PwVocE7S6nOv2u5SPeunWoYebcvkgYQHIyRltqg7mUV/Rl8OfBtl8PPB+laDptulrpui2cVlaQxrtSKKNQiqB6BVAH0615fBmGmpTxDWjVkfoX0reIMNOGDyelK84tzl5Jqy/U/Pn/g488AX2s/BT4eeJYInfT9B1e5s7oqjMIjcRIyO2P4M25HPBZlHUisv/AIIcftr/AAy+Fv7Luo+D/FnjLQvCmvWGt3N8ItYultI7iGWOEq6SyYRzuVwV37vl6YK1+j/xB8BaL8UPB99oHiLS7HWtE1NPKu7K8hWWGdcggFSDyCAQeoIBBBFfF3jf/g33+BPizxNc39jd+PPDdrOV2afpuqxPbQYAB2G4glmIJBPMhHJwAK+/vpY/jE+B/wDgtX+0l4S/aX/bBtNT8GarDrOlaD4fg0SS/gO63nnS4uZXaNv+WiDzwu4fKWUlSwOa7H/grn4Ov/h7+zD+ynouqW0lnqWneDpobu3kG17aQRWO6Jh/eQkqfcGvvr9nL/gi58D/ANnbxNFrcOlav4u1i0uFubG68R3iXIsnXoUhiSOBsHDAyI7AgEEEV1v7bn/BODwP+3tqXhu58X6t4r00+F0uFtP7GuLeISCYxFjJ5sEu4gwqVIK98g8UJ2A5r/giP/yjU+H/AP111P8A9OV1X55f8HA3/J+0P/YsWP8A6Mnr9dP2XP2bND/ZK+B2j+AfDd1q95o2hNOYJdSlSW6k86eSZt7IiKcNIcYUHAAyep8u/bP/AOCWXwx/bk8YWHiLxU/iTS9esbVbBr7RryOB7qBS7LHIssUkZwXf5gob5sFiFUKX1uB+dH/BYD/k3X9k/wD7J7D/AOk1jXr2p/BLUfjb/wAG8HhKPSbaW91DwxNca8kESb3kjh1K8WbAwc7YZJHwOcIcV9VftH/8Emvh1+1B4M+H2heINZ8bWlr8NdJGiaW9hd2iS3MIjiQNN5lu4Z8Qp91UXJPBGMey/szfs+6P+yt8D9B8AeHrjVLvR/D6SpbT6hLHJdOZZpJm3mNEUndIeiD5cZzzRcD8lf8AgiP+314N/ZI8Q+L/AA58QNRk0bRPFRtruy1AQSTw29xFvQo6oGbEgdcNtwDH2DCvsf8AaY/4Ly/CL4NG1t/B/wBp+JOpSyEXIsC9paWiAA5M8iESEluFiDjhgWU4B6D46f8ABDv4F/HXxc+tJYa/4KvLh3luk8N3kdtb3TtjkwzRypHjHAiCKdzEgk1i/Dv/AIIBfAfwD4pg1O9l8a+K4YP+YfrGpQfZHJIwzCCCFzj034IJyDSeoGb8dP22fFX7T3/BIL4k/Erwz4W1rwTdXRNhZILlbya6sPtVvBd3KsIwY08t7tGOAyeU7KwOGH5/f8EpPB3wC8W/FjXY/jrfWtrBBaI+iRajdyWWnTyByZjLKrLh1GwIrEKQ0gOSFr92YvB2kJ4SXw+uk6YmgLZjThpn2ZPsYtgnl+R5W3Z5ez5NmNu3jGK+NviP/wAEBvgT4+8W3GqWcvjfwrBdYzp+kapD9kjbPLKtxBK65PJXftHQKAAKAPjD/grr8ePgLrvhTwz4A+COi+FUGnXw1HWNU0HS47S3cpE0cUPnKiNcth5CWyQCQNzFmC+4/sL/ABi8U/8ABOv/AIJFJ8RpPBEvieDXfFD6iLGS7axMFjOsdvHdMxikO1pYECjaMiZTnG3PuvwX/wCCGPwH+D/iD+0rvTNe8bTxOj28fiO+Se3t2UnkQwpEkgJwdsoccdBxX1rqvhbS9d8N3Oi3mnWF3o95bmymsZrdZbaWBl2GJoyNpQrlSpGMHGMCncD8kfgt8Vf2QP26vFmu/wDCx/h7onwR15xG1he2WvTW1nfg7g7fIkVrHIpVSfMjw/mAgthiPnf/AIKGfs3/AAY+AHiDQE+D3xOPj621OKT7ZaNNDevp5XbtY3MCrG/mZKhNodQmSWDrX6VfED/ggJ8CPH3iaXUbJ/GvhKG4UZsNH1WJrVG5JZftEMzgnPQPt9ABgU/4e/8ABAb4DeA/EC39+fGni2FFI+xazqsa2zNxhm+zQwucY6FypBOVPFPmA+U/AOs+I9Y/4N4fHY1x76TTrXxNBBoDXC4X7AL7T2xEf4oxctdKDlsFWXIChR6J/wAG0v8Ax5fGb/rpov8A7kK+8v2gv2TfCn7RX7Od58LL+K80DwpcRWsMcWhLFayWUdvLHLHHEGjaNFBiVcbMbTgY61y/7DX/AATu8FfsCL4nTwdqfirUR4qNqbv+2bm3mEf2fztnl+VDFjPnvnOeg6d5Arf8FYv+UdvxT/7BS/8Ao+Kvz+/4NwP+Tl/H3/YsL/6VxV+qX7RfwR0r9pH4La/4G1u41G10nxJb/ZrmawkSO5jUMHBRnV1Byo6o30ryH9ib/glz4A/YQ8daxr/hHWPGGo3mtWP2CaPWLq2mijj8xZMoIoIyDle5I5PFO+lgPpSiiikAU2T7tOooBohmb5R0618R/wDBSv8A4JGaZ+11PJ4v8Iz2fh/x9GgWYyrttNYVQAgn2jKyKAAJACdoCsGAUp9xUyXgDtz6Vz4rCUsTT9lWV0e5w5xLmGRY2OYZbU5Kkfut2a6pn81vxx/Zh8ffs16++n+NfC2raHIj7I55Yf8ARJjjOYplzG/ykEhWJUkggYxXBgAdMf41/UDrOgWOvWrw3tpb3UUoKukqBg4PYg8H8a8svv2CvgtqV3JcT/Cr4fyyzsWkd9AtGZz6k+XzXxlfgz326U7L01++5/VGU/SwqLDKlmeBU5d4tpP5NO33s/nSBIOR1HIOQNp7Hnjr9R68Zr2z9mL/AIJ6fFX9ra8iPhfw1PbaK4ydZ1MNaaeikHlXILPypH7pGx34wR+5/hX9in4SeBdYh1LRvhv4J0y+g5juLbQ7WKVPoyoDXpllax2u1Yo1jUDgKAP6VpheDIRn7StO/lb/AIJyZ/8ASqxdTDujlGDjSk9m3e1+ySWvzt5Hgf7BP/BP3wn+wz4Cey00nVfEeoKraprM0YSa8YdFUAnZEpztQEgA8lm3MfoKMfMefwp+KK+xoUIUYKnTVkj+WM3zfGZpi547H1HOpN3be7CiiitjzQooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACkfpRRSY0Rnk05jjH0oopomeyI/4/wAalTr+FFFVIyp7jqKKKk2CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//2Q==" style="width: 200px;" />
                        </div>
                        <h3>Dear ${fullName},</h3>


                        <h4>Thank you for signing up to use Unicash. A secure and trusted exchange service that will serve your transaction needs.</h4>

                        <h4>Here is your exchange transaction information, and it is currently processing.</h4>

                            <h3>You send: <strong>${params.sendAmount}${params.from}</strong></h3>
                            <h3 style="margin-top: -15px">You received: <strong>${params.amount} PHP ${params.to}</strong></h3>
                            <h3 style="margin-top: -15px">Order Id: <strong>${newTransaction.id}</strong></h3>
                            <h3 style="margin-top: -15px">Status: <strong>${params.status}</strong></h3>

                        <h4>Please give us a feedback <a href="https://www.unicash.ph/feedback">https://www.unicash.ph/feedback</a></h4>

                        <h4>Having trouble in your transaction? Please send us email support at ${config.mail.from}</h4>

                        <h3>Unicash Team</h3>
                        </html>`
    const msg = {
        to: user.email,
        from: config.mail.from,
        subject: 'Welcome to Unicash',
        text: 'Transaction',
        html: htmlContent
      };

    //if (params.status === 'Processing' || params.status === 'Completed')
    sgMail
        .send(msg)
        .then(() => {}, error => {
            console.error(error);

            if (error.response) {
            console.error(error.response.body)
            }
        });

    return newTransaction;
}
async function getTransactionById(id) {
    return await getTransaction(id);
}
async function getAllTransactionsByUserId(id) {
    const transactions = await db.Transaction.findAll({ order: [['id', 'DESC']], where: { userId: id }});
    if (!transactions) throw 'NO TRANSACTION';
    return transactions;
}
async function getTransactions() { // Limited 5
    const transactions = await db.Transaction.findAll({ limit: 5, order: [['id', 'DESC']]});
    if (!transactions) throw 'NO TRANSACTION';

    let result = [];
    transactions.forEach((transaction, index) => {
        result.push({
            ...transaction.dataValues,
            userName: "unknown"
        })
    });
    return result;
}
async function getTransaction(id) {
    const transaction = await db.Transaction.findByPk(id);
    if (!transaction) throw 'Transaction not found';
    return transaction;
}

function randomOrderId() {
    var length = 6;
    var charset = "0123456789";
    var retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }