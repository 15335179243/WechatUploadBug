const { Wechaty, ScanStatus, log, FileBox, } = require('wechaty')
const schedule       = require('node-schedule');
const bot = new Wechaty({
    name: 'ding-dong-bot',
    /**
     * How to set Wechaty Puppet Provider:
     *
     *  1. Specify a `puppet` option when instantiating Wechaty. (like `{ puppet: 'wechaty-puppet-padlocal' }`, see below)
     *  1. Set the `WECHATY_PUPPET` environment variable to the puppet NPM module name. (like `wechaty-puppet-padlocal`)
     *
     * You can use the following providers:
     *  - wechaty-puppet-wechat (no token required)
     *  - wechaty-puppet-padlocal (token required)
     *  - wechaty-puppet-service (token required, see: <https://wechaty.js.org/docs/puppet-services>)
     *  - etc. see: <https://github.com/wechaty/wechaty-puppet/wiki/Directory>
     */
    // puppet: 'wechaty-puppet-wechat',
})

bot.on('scan', onScan)
bot.on('login', onLogin)
bot.on('logout', onLogout)
bot.on('friend', onFriend)
bot.on('message', onMessage)
bot.on('friendship', friendship)
bot.on('room-invite', invitation)

bot.start()
    .then(() => log.info('StarterBot', 'Starter Bot Started.'))
    .catch(e => log.error('StarterBot', e))

var list = new Array()

async function onFriend(contact, request) {
    if (request) {
        let name = contact.name();
        // await request.accept()
        log.info(`Contact: ${name} send request ${request.hello()}`);
    }
}


function onScan(qrcode, status) {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
        require('qrcode-terminal').generate(qrcode)  // show qrcode on console

        const qrcodeImageUrl = [
            'https://wechaty.js.org/qrcode/',
            encodeURIComponent(qrcode),
        ].join('')

        log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)

    } else {
        log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status)
    }
}

const monitorTask = { "name": '[聊天监控]', "crontab": "0 */1 * * * *", "contact": undefined, "room": "请你们看美女" }
let index=0
function onLogin(user) {
    log.info('StarterBot', '%s login', user)
    // list.push("https://onedrive.xiazai.de/1/BMjAxOTA3MDMwNzE4MjFfMjY1NjIxNzE5XzE0NzIyMTU1MTk4XzFfMw%3D%3D_b_B817917201f689e9744dccef4e3af80da.mp4")
    // list.push("https://onedrive.xiazai.de/1/BMjAxOTA3MDQxMjU1NTJfMTIwNTAzNTA3MV8xNDc2NzU4NTk4Ml8xXzM%3D_b_B2ff543d3a7cfba0357aad7bf5dfd04a4.mp4")
    // list.push("https://onedrive.xiazai.de/1/BMjAxOTA3MDQxNzM2MDlfNDA4OTcyOTYxXzE0Nzc3MDY0MDM1XzFfMw%3D%3D_b_B51c78b7d5ea9594b541e52ba3f0e1682.mp4")
    // list.push("https://onedrive.xiazai.de/1/BMjAxOTA3MjcxNzM4NDRfMTM1NDE5Mzk3N18xNTY4NjI4NjE0MF8xXzM%3D_b_B70226c1e2bcabc1899b9e30763626106.mp4")
    // list.push("https://onedrive.xiazai.de/1/BMjAxOTA3MjQwNTQ4MjhfMTM5Nzc4NDM1MV8xNTU1MDYwNjMwNF8xXzM%3D_b_B0503d5e72005bab31f87a8f2a2d1b1f5.mp4")
    // list.push("https://onedrive.xiazai.de/1/BMjAxOTA3MjQxNzIwMzhfMTE4MDkzOTU2Ml8xNTU3MDQ2ODcwNF8xXzM%3D_b_B26bbc5e3744a08e0431dacb2dccddc06.mp4")
    // list.push("https://onedrive.xiazai.de/1/BMjAxOTA4MjcxNzI3MDVfMzg4MjAyMjAwXzE2ODYzOTUyMDIxXzFfMw%3D%3D_b_B3333feb066c782937517c3eeb6bf58f3.mp4")
    // list.push("https://onedrive.xiazai.de/1/BMjAxOTA5MDIxOTQ5MzRfNzU1NDM2NzVfMTcwNzMzODc4ODRfMV8z_b_Ba0f6264c0598a19d6727431e02e244ab.mp4")
    // list.push("https://onedrive.xiazai.de/1/BMjAxOTA5MjkxOTU0MzRfMTI5Nzk5ODkzN18xNzk2NzQzNTEyNV8yXzM%3D_b_Bbe494ce0341aac7a30f446e1bef138f2.mp4")
    // list.push("https://onedrive.xiazai.de/1/BMjAxOTA5MjMyMDA3MzlfNzU1NDM2NzVfMTc3ODI5MDU5NTFfMV8z_b_B868b5e17db265fb8b4f9a8f0fabcd85d.mp4")
    // list.push("https://onedrive.xiazai.de/1/BMjAxOTA5MTMwNzA2MzJfNDM5OTE4MDg1XzE3NDAxODQyNTUxXzFfMw%3D%3D_b_B65ac971b282884386f2c241907d0e8fd.mp4")
    // list.push("https://onedrive.xiazai.de/1/BMjAxOTA5MTUwOTA3NDVfMTQ1Mzg0MDA0MF8xNzUwMjQxNTg0MV8xXzM%3D_b_B67a844417739db69ba23950eaa823de9.mp4")
    // list.push("https://onedrive.xiazai.de/1/BMjAxOTEwMjAxOTU2MjBfNjY5ODUxOTgwXzE4NzE3ODYyNDkxXzFfMw%3D%3D_b_B724ba1d3e8f8155e65e44666ed7c3b17.mp4")
    // list.push("https://onedrive.xiazai.de/1/BMjAxOTEwMjcxNTU5NDlfNzU1NDM2NzVfMTg5MzYwOTcxMThfMV8z_b_Bc413bc19a355405973d4e6707f4c3490.mp4")
    // list.push("https://onedrive.xiazai.de/10/kw615.mp4")
    // list.push("https://onedrive.xiazai.de/10/kw133.mp4")
    // list.push("https://onedrive.xiazai.de/10/kw148.mp4")
    // list.push("https://onedrive.xiazai.de/10/kw223.mp4")
    // list.push("https://onedrive.xiazai.de/10/kw246.mp4")
    // list.push("https://onedrive.xiazai.de/10/kw252.mp4")
    // list.push("https://onedrive.xiazai.de/10/kw277.mp4")
    // list.push("https://onedrive.xiazai.de/10/kw278.mp4")
    // list.push("https://onedrive.xiazai.de/10/kw293.mp4")
    // list.push("https://onedrive.xiazai.de/10/kw318.mp4")
    // list.push("https://onedrive.xiazai.de/10/kw322.mp4")





    list.push("http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4")
    list.push("http://vfx.mtime.cn/Video/2019/03/21/mp4/190321153853126488.mp4")
    list.push("http://vfx.mtime.cn/Video/2019/03/19/mp4/190319222227698228.mp4")
    list.push("http://vfx.mtime.cn/Video/2019/03/19/mp4/190319212559089721.mp4")
    list.push("http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4")
    list.push("http://vfx.mtime.cn/Video/2019/03/18/mp4/190318214226685784.mp4")
    list.push("http://vfx.mtime.cn/Video/2019/03/19/mp4/190319104618910544.mp4")
    list.push("http://vfx.mtime.cn/Video/2019/03/19/mp4/190319104618910544.mp4")
    list.push("http://vfx.mtime.cn/Video/2019/03/19/mp4/190319125415785691.mp4")
    list.push("http://vfx.mtime.cn/Video/2019/03/17/mp4/190317150237409904.mp4")
    list.push("http://vfx.mtime.cn/Video/2019/03/14/mp4/190314223540373995.mp4")
    list.push("http://vfx.mtime.cn/Video/2019/03/14/mp4/190314102306987969.mp4")
    list.push("http://vfx.mtime.cn/Video/2019/03/13/mp4/190313094901111138.mp4")
    list.push("http://vfx.mtime.cn/Video/2019/03/12/mp4/190312143927981075.mp4")
    list.push("http://vfx.mtime.cn/Video/2019/03/12/mp4/190312083533415853.mp4")
    list.push("http://vfx.mtime.cn/Video/2019/03/09/mp4/190309153658147087.mp4")
    list.push("http://vjs.zencdn.net/v/oceans.mp4")
    list.push("http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4")
    list.push("https://media.w3.org/2010/05/sintel/trailer.mp4")

    log.info("----------------------------登录成功---------------------------")
    setSchedule(monitorTask["crontab"], async () => {
        log.info("----------------------------定时任务---------------------------")
        const roomList = await bot.Room.findAll({ topic: monitorTask['room'] })
        if (roomList && roomList.length > 0) {
            if (index <= list.length-1) {
                roomList[0].say(FileBox.fromUrl(list[index]))
                index++
            }
        } else {
            log.info("没有找到机器人测试群")
        }
    })
}

function onLogout(user) {
    log.info('StarterBot', '%s logout', user)
}

async function onMessage(msg) {
    log.info('StarterBot', msg.toString())

    if (msg.text() === 'ding') {
        await msg.say('dong')
    }
}
async function friendship(msg) {
    log.info('收到好友请求：', msg.toString())

    if (msg.text() === '1') {
        await contact.say('2')
    }
}
async function invitation(msg) {
    log.info('收到群消息：', msg.toString())

    if (msg.text() === 'ding') {
        await msg.say('dong')
    }
}


//----------------------------running----------------------------
//----------------------------running----------------------------
//date 参数

// 其他规则见 https://www.npmjs.com/package/node-schedule
// 规则参数讲解, 规则类似 Linux 下的 crontab ('*'代表通配符) 
//
// *  *  *  *  *  *
// ┬ ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │ |
// │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
// │ │ │ │ └───── month (1 - 12)
// │ │ │ └────────── day of month (1 - 31)
// │ │ └─────────────── hour (0 - 23)
// │ └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

// 1. 按固定时间触发
//
// 每分钟的第30秒触发： '30 * * * * *'
//
// 每小时的1分30秒触发 ：'30 1 * * * *'
//
// 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
//
// 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
//
// 每周1的1点1分30秒触发 ：'30 1 1 * * 1'

// 2. 按时间差触发 (日/月/周同理)
//
// 每30分钟触发一次: '0 */30 * * * *'
//
// 每6小时触发一次: '0 0 */6 * * *'

function setSchedule(date, callback) {
    schedule.scheduleJob({ tz: 'Asia/Shanghai', rule: date }, callback)
}

finis((code, signal, error) => {
    log.error('Importand data saved at this step.')
    bot.stop()
    log.error(`Wechaty exit ${code} because of ${signal}/${error}`)
    process.exit(1)
  })
  

