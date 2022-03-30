const qrcode = require('qrcode-terminal');
const fs = require("fs");
const mime = require('mime-types');
const { Client, MessageMedia } = require('whatsapp-web.js');
const client = new Client();



client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
	console.log(message.body);
});

client.on('message', message => {
	if(message.body === 'ping') {
		message.reply('pong');
	}

// stickers section

if(message.body === '-sticker'){
    if(message.hasMedia){
        message.downloadMedia().then(media => {

            if (media) {

                const mediaPath = './downloaded-media/';

                if (!fs.existsSync(mediaPath)) {
                    fs.mkdirSync(mediaPath);
                }


                const extension = mime.extension(media.mimetype);

                const filename = new Date().getTime();

                const fullFilename = mediaPath + filename + '.' + extension;


                if(extension==='mp4'){
                    console.log("fakiu")
                }else{


                // Save to file
                try {
                    fs.writeFileSync(fullFilename, media.data, { encoding: 'base64' });
                    console.log('File downloaded successfully!', fullFilename);
                    console.log(fullFilename);
                    MessageMedia.fromFilePath(filePath = fullFilename)
                    client.sendMessage(message.from, new MessageMedia(media.mimetype, media.data, filename), { sendMediaAsSticker: true,stickerAuthor:"Pantunfla12",stickerName:"Sticker"} )
                    fs.unlinkSync(fullFilename)
                    console.log(`File Deleted successfully!`,);
                } catch (err) {
                    console.log('Failed to save the file:', err);
                    console.log(`File Deleted successfully!`,);
                }
            }
        }
        });
    }else{
        message.reply(`send image with caption *-sticker* `)
    }
}


});






client.initialize();